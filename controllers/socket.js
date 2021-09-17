const { Users, GameChatRooms, Messages } = require('../models');

module.exports = (socket) => {
  const ns = socket.nsp;
  ns.on('connection', (nsSocket) => {
    nsSocket.on('joinRoom', async (roomUid, voiceChatUid, userData, msgData) => {
      // search User and Update User ` currentRoom ` Column
      try {
        const { id, userId, avatar, nickname } = userData;
        await Users.update({
          currentRoom: roomUid
        }, {
          where: { id, userId }
        });
        nsSocket.join([roomUid, voiceChatUid]);
        nsSocket.to(roomUid).emit('welcomeRoom', userData, msgData);
      } catch (err) {
        console.log(err);
        return null;
      }
    });

    nsSocket.on('roomMessage', async (roomUid, roomId, userData, msgData) => {
      try {
        const { id, userId, avatar, nickname } = userData;
        await Messages.create({
          userId: id,
          roomId,
          message: msgData,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        nsSocket.to(roomUid).emit('roomMessage', userData, msgData);
      } catch (err) {
        console.log(err);
        return null;
      }
    });
    nsSocket.on('voiceChat', (voiceChatUid, userData, peerId) => {
      const { id, userId } = userData;
      nsSocket.broadcat.to(voiceChatUid).emit('userConnect', peerId);
      nsSocket.on('disconnect', () => {
        nsSocket.broadcast.to(voiceChatUid).emit('userDisconnect', peerId);
      });
    });
  });
};
