const { Users, GameChatRooms, Messages } = require('../models');
const crypto = require('crypto');
const randomId = () => crypto.randomBytes(10).toString('hex');
const Redis = require('ioredis');
require('dotenv').config();
const redisClient = new Redis(6379, process.env.REDIS_HOST, { password: process.env.REDIS_PASSWORD });

const { RedisTokenStore } = require('../store/tokenStore');
const tokenStore = new RedisTokenStore(redisClient);

const { RedisMessageStore } = require('../store/messageStore');
const messageStore = new RedisMessageStore(redisClient);

const { RedisRoomMessageStore } = require('../store/roomMessageStore');
const roomMessageStore = new RedisRoomMessageStore(redisClient);

module.exports = {
  nspSocket: async (socket) => {
    const ns = socket.nsp;

    tokenStore.saveToken(socket.token, {
      userId: socket.userId,
      avatar: socket.avatar,
      nickname: socket.nickname,
      connected: true
    });
    socket.emit('token', {
      token: socket.token,
      userId: socket.userId
    });

    const users = [];
    const [tokens] = await Promise.all([
      tokenStore.findAllToken()
    ]);
    tokens.forEach((token) => {
      users.push({
        userId: token.userId,
        nickname: token.nickname,
        avatar: token.avatar,
        connected: token.connected
      });
    });
    socket.emit('users', users);

    socket.broadcast.emit('user connected', {
      userId: socket.userId,
      nickname: socket.nickname,
      avatar: socket.avatar,
      connected: true
    });

    socket.on('joinRoom', async (roomUid, voiceChatUid, userData) => {
    // search User and Update User ` currentRoom ` Column
      try {
        const { id, userId, avatar, nickname } = userData;
        await Users.update({
          currentRoom: roomUid
        }, {
          where: { id, userId }
        });
        socket.join(roomUid);
        ns.to(roomUid).emit('welcomeRoom', userData);
      } catch (err) {
        console.log(err);
        return null;
      }
    });
    socket.on('voiceChat', (voiceChatUid, userPeerId) => {
      socket.join(voiceChatUid);
      ns.to(voiceChatUid).emit('userConnect', userPeerId);
      socket.on('disconnect', () => {
        ns.to(voiceChatUid).emit('userDisconnect', userPeerId);
      });
    });

    socket.on('roomMessage', (roomUid, roomId, userData, msgData) => {
      ns.to(roomUid).emit('roomMessage', userData, msgData);
      roomMessageStore.saveRoomMessages({
        uuid: roomUid,
        id: roomId,
        message: msgData,
        userData
      });
    });

    socket.on('serverSize', () => socket.emit('serverSize', users.length));

    socket.on('disconnect', async () => {
      const matchingSockets = await socket.in(socket.userId).allSockets();
      const isDisconnected = matchingSockets.size === 0;
      if (isDisconnected) {
        // notify other users
        socket.broadcast.emit('user disconnected', socket.userId);
        // update connection status
        tokenStore.saveToken(socket.token, {
          userId: socket.userId,
          avatar: socket.avatar,
          nickname: socket.nickname,
          connected: false
        });
      }
    });
  },

  rootSocket: async (socket) => {
    tokenStore.saveToken(socket.token, {
      userId: socket.userId,
      avatar: socket.avatar,
      nickname: socket.nickname,
      connected: true
    });
    socket.emit('token', {
      token: socket.token,
      userId: socket.userId
    });
    socket.join(socket.userId);

    // fetch existing users
    const users = [];
    const [messages, tokens] = await Promise.all([
      messageStore.findMessagesForUser(socket.userId),
      tokenStore.findAllToken()
    ]);
    const messagesPerUser = new Map();
    messages.forEach((message) => {
      const { from, to } = message;
      const otherUser = socket.userId === from ? to : from;
      if (messagesPerUser.has(otherUser)) { messagesPerUser.get(otherUser).push(message); } else messagesPerUser.set(otherUser, [message]);
    });
    tokens.forEach((token) => {
      users.push({
        userId: token.userId,
        nickname: token.nickname,
        avatar: token.avatar,
        connected: token.connected,
        messages: messagesPerUser.get(token.userId) || []
      });
    });
    socket.emit('users', users);
    // notify existing users

    socket.on('private message', ({ content, to }) => {
      const message = {
        content,
        from: socket.userId,
        to
      };
      socket.to(to).to(socket.userId).emit('private message', message);
      messageStore.saveMessage(message);
    });

    // notify users => disconnection
  },

  useToken: async (socket, next) => {
    const token = socket.handshake.auth.token ? socket.handshake.auth.token : null;
    if (token) {
      const findToken = await tokenStore.findToken(token);
      if (findToken) {
        socket.token = token;
        socket.userId = findToken.userId;
        socket.nickname = findToken.nickname;
        return next();
      }
    }
    const nickname = socket.handshake.auth.nickname;
    socket.token = randomId();
    socket.avatar = socket.handshake.auth.avatar || null;
    socket.userId = socket.handshake.auth.userId ? socket.handshake.auth.userId : randomId();
    socket.nickname = nickname;
    next();
  }
};
