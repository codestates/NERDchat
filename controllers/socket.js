const { Users, GameChatRooms, Messages } = require('../models');
const crypto = require('crypto');
const randomId = () => crypto.randomBytes(10).toString('hex');
const Redis = require('ioredis');
require('dotenv').config()
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

    socket.on('joinRoom', async (roomUid, voiceChatUid, userData) => {
    // search User and Update User ` currentRoom ` Column
      try {
        const { id, userId, avatar, nickname } = userData;
        await Users.update({
          currentRoom: roomUid
        }, {
          where: { id, userId }
        });
        socket.join([roomUid, voiceChatUid]);
        ns.to(roomUid).emit('welcomeRoom', userData);
      } catch (err) {
        console.log(err);
        return null;
      }
    });

    socket.on('roomMessage', async (roomUid, roomId, userData, msgData) => {
      try {
        roomMessageStore.saveRoomMessages({
          uuid: roomUid,
          id: roomId,
          message: msgData,
          userData
        });
        ns.to(roomUid).emit('roomMessage', userData, msgData);
      } catch (err) {
        console.log(err);
        return null;
      }
    });
    socket.on('voiceChat', (voiceChatUid, userData, peerId) => {
      const { id, userId } = userData;
      socket.broadcast.to(voiceChatUid).emit('userConnect', peerId);
      socket.on('disconnect', () => {
        socket.broadcast.to(voiceChatUid).emit('userDisconnect', peerId);
      });
    });
    socket.on('currentNSLength', () => {
      ns.emit('currentNSLength', ns.adapter.sids.size);
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
    socket.broadcast.emit('user connected', {
      userId: socket.userId,
      nickname: socket.nickname,
      avatar: socket.avatar,
      connected: true,
      messages: []
    });

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

  useToken: async (socket, next) => {
    const token = socket.handshake.auth.token ? socket.handshake.auth.token : null;
    if (token) {
      const findToken = await tokenStore.findToken(token);
      if (findToken) {
        socket.token = findToken;
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
