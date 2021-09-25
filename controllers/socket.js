const { Users, GameChatRooms, Messages } = require('../models');
const crypto = require('crypto');
const randomId = () => crypto.randomBytes(10).toString('hex');
const Redis = require('ioredis');
const redisClient = new Redis(6379, process.env.REDIS_HOST);

const { RedisTokenStore } = require('../store/tokenStore');
const tokenStore = new RedisTokenStore(redisClient);

const { RedisMessageStore } = require('../store/messageStore');
const messageStore = new RedisMessageStore(redisClient);

module.exports = {
  socket: async (socket) => {
    tokenStore.saveToken(socket.token, {
      userId: socket.userId,
      nickname: socket.nickname,
      connected: true
    });
    socket.emit('cookie', {
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
        connected: token.connected,
        messages: messagesPerUser.get(session.userId) || []
      });
    });
    socket.emit('users', users);

    // notify existing users
    socket.broadcast.emit('user connected', {
      userId: socket.userId,
      nickname: socket.nickname,
      connected: true,
      messages: []
    });

    const io = require('socket.io')();
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
      const matchingSockets = await io.in(socket.userId).allSockets();
      const isDisconnected = matchingSockets.size === 0;
      if (isDisconnected) {
        // notify other users
        socket.broadcast.emit('user disconnected', socket.userId);
        // update connection status
        tokenStore.saveToken(socket.token, {
          userId: socket.userId,
          nickname: socket.nickname,
          connected: false
        });
      }
    });

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
        const { id, userId, avatar, nickname } = userData;
        await Messages.create({
          userId: id,
          roomId,
          message: msgData,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        ns.to(roomUid).emit('roomMessage', userData, msgData);
      } catch (err) {
        console.log(err);
        return null;
      }
    });
    socket.on('voiceChat', (voiceChatUid, userData, peerId) => {
      const { id, userId } = userData;
      ns.broadcat.to(voiceChatUid).emit('userConnect', peerId);
      socket.on('disconnect', () => {
        ns.broadcast.to(voiceChatUid).emit('userDisconnect', peerId);
      });
    });
    socket.on('currentNSLength', () => {
      ns.emit('currentNSLength', ns.adapter.sids.size);
    });
  },
  useCookie: async (socket, next) => {
    const socketToken = socket.handshake.auth.socketToken;
    if (socketToken) {
      const token = await tokenStore.findCookie(socketToken);
      if (token) {
        socket.socketToken = socketToken;
        socket.userId = token.userId;
        socket.nickname = token.nickname;
        return next();
      }
    }
    const guest = `Guest${Math.ceil(Math.random() * 1000000)}`;
    const nickname = socket.handshake.auth.nickname || guest;

    socket.socketToken = randomId();
    socket.userId = randomId();
    socket.nickname = nickname;
    next();
  }
};
