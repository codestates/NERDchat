const { Users, GameChatRooms, Messages } = require('../models');

module.exports = (socket) => {
  const ns = socket.nsp;
  socket.on('joinRoom', async (roomUid, voiceChatUid, userData) => {
    // search User and Update User ` currentRoom ` Column
    try {
      const { id, userId, avatar, nicsocketname } = userData;
      await Users.update({
        currentRoom: roomUid
      }, {
        where: { id, userId }
      });
      socket.join([roomUid, voiceChatUid]);
      ns.to(roomUid).emit('welcomeRoom', userData, msgData);
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
};
