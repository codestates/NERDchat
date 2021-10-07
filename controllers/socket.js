const { GameChatRooms } = require('../models');
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

const { RedisRoomStore } = require('../store/roomStore');
const roomStore = new RedisRoomStore(redisClient);

const roomUsers = {};
const roomSockets = {};

module.exports = {
  nspSocket: async (socket) => {
    const ns = socket.nsp;

    socket.on('joinVoice', roomUid => {
      if (roomUsers[roomUid]) roomUsers[roomUid].push(socket.userId);
      else roomUsers[roomUid] = [socket.userId];
      socket.join([roomUid, socket.userId]);
      roomSockets[socket.userId] = roomUid;
      const usersInRoom = roomUsers[roomUid].filter(id => id !== socket.userId);
      ns.to(roomUid).emit('allUsers', usersInRoom);
    });
    socket.on('sending signal', payload => {
      ns.to(payload.userToSignal).emit('userJoin', { signal: payload.signal, callerId: payload.callerId });
    });
    socket.on('return signal', payload => {
      ns.to(payload.callerId).emit('receive return signal', { signal: payload.signal, id: socket.userId });
    });

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

    socket.on('joinRoom', async (roomUid, userData) => {
    // search User and Update User ` currentRoom ` Column
      try {
        const [roomStatus] = await Promise.all([
          roomStore.findRoom({ uuid: roomUid })
        ]);
        socket.join(socket.userId);
        const maxLen = await GameChatRooms.findOne({ where: { uuid: roomUid } });
        if (maxLen.max === roomStatus.length) {
          ns.to(socket.userId).emit('fullRoom');
          socket.leave(socket.userId);
          return;
        } else {
          const data = {
            userId: userData.userId,
            avatar: userData.avatar,
            nickname: userData.nickname
          };
          roomStore.saveRoom({ uuid: roomUid, user: data });
          const [roomInfo] = await Promise.all([
            roomStore.findRoom({ uuid: roomUid })
          ]);
          socket.join(roomUid);
          ns.to(roomUid).emit('welcomeRoom', roomInfo);
        }
      } catch (err) {
        console.log(err);
        return null;
      }
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
    socket.emit('serverSize', users.filter((el) => el.connected).length);
    // socket.on('serverSize', () => socket.emit('serverSize', users.filter((el) => el.connected).length));

    socket.on('disconnect', async () => {
      const matchingSockets = await socket.in(socket.userId).allSockets();
      const uuid = roomSockets[socket.userId];
      let room = roomUsers[uuid];
      if (room) {
        room = room.filter(id => id !== socket.userId);
        roomUsers[uuid] = room;
      }
      const isDisconnected = matchingSockets.size === 0;
      if (isDisconnected) {
        const userData = {
          userId: socket.userId,
          avatar: socket.avatar ? socket.avatar : null,
          nickname: socket.nickname
        };
        // notify other users
        socket.broadcast.emit('serverSize', users.filter((el) => el.connected).length);
        socket.broadcast.emit('user disconnected', socket.userId);
        // update connection status
        tokenStore.saveToken(socket.token, {
          userId: socket.userId,
          avatar: socket.avatar,
          nickname: socket.nickname,
          connected: false
        });
        roomStore.deleteRoomUser({ uuid, user: userData });
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
    socket.on('users', async () => {
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
    });

    socket.on('private message', ({ content, to, invite, friend }) => {
      const message = {
        content,
        from: socket.userId,
        to,
        invite,
        friend
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
