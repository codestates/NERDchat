module.exports = (socket) => {
  socket.on('joinRoom', async (uuid, userData, msgData) => {
    const { id, userId, avatar, nickname } = userData;
    socket.join(uuid);
    // search User and Update User ` currentRoom ` Column
    socket.to(uuid).emit('welcomeRoom', userData, msgData);
  });
  socket.on('voiceChat', (uuid, userData, peerId) => {
    socket.broadcast.to(uuid).emit('userConnect', peerId);
    socket.on('disconnect', () => {
      // search User and Update User ` currentRoom ` Column
      socket.broadcast.to(uuid).emit('userDisconnect', peerId);
    });
  });
  socket.on('chatMessage', (uuid, userData, msgData) => {
    // add Message Data => ` Message ` Table
    socket.to(uuid).emit('chatMessage', userData, msgData);
  });
};
