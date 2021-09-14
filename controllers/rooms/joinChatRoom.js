const { GameChatRooms } = require('../../models');
const { Users } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');
const io = require('socket.io')();

module.exports = async (req, res) => {
  const { uuid } = req.params;
  const { authentication } = req.headers;
  if (authentication) res.status(401).json({ message: 'token not found' });
  else {
    const userData = verifyAccess(authentication);
    if (!userData) res.status(400).json({ message: 'token expired' });
    else {
      const chatRoomData = await GameChatRooms.findOne({ where: { uuid } });
      if (io.sockets.manager.rooms[uuid].length <= chatRoomData.max) res.status(403).json({ message: 'full' });
      else {
        await Users.update({ currentRoom: uuid }, { where: { id: userData.id } });
        res.status(200).json({ data: { userId: userData.id, roomId: chatRoomData.id, createdAt: chatRoomData.createdAt } });
      }
    }
  }
};
