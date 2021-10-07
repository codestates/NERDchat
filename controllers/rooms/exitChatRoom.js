const { GameChatRooms } = require('../../models');
const { Users } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');

module.exports = async (req, res) => {
  const { uuid } = req.params;
  const userData = await verifyAccess(req, res);
  if (userData) {
    try {
      const usersRoomId = await Users.findOne({ where: { id: userData.id } });
      if (uuid !== usersRoomId.currentRoom) res.status(400).json({ message: 'different uuid' });
      else {
        await Users.update({
          currentRoom: null
        }, { where: { id: userData.id } });
        const roomUsers = await Users.findAll({ where: { currentRoom: uuid } });
        if (!roomUsers.length) await GameChatRooms.destroy({ where: { uuid } });
        res.status(200).json({ message: 'exit' });
      }
    } catch (err) {
      console.log(err);
    }
  }
};
