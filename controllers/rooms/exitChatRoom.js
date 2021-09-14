const { GameChatRooms } = require('../../models');
const { Users } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');
const io = require('socket.io')();

module.exports = async (req, res) => {
  const { uuid } = req.params;
  const token = req.headers.authorization.split(' ')[1];
  if (!token) res.status(401).json({ message: 'token not found' });
  else {
    const userData = verifyAccess(token);
    console.log(userData);
    if (!userData) res.status(400).json({ message: 'token expired' });
    else {
      try {
        const usersRoomId = await Users.findOne({ where: { id: userData.id } });
        if (uuid !== usersRoomId.currentRoom) res.status(500).json({ message: 'different uuid' });
        else {
          await Users.update({
            currentRoom: null
          }, { where: { id: userData.id } });
          res.status(200).json({ message: 'exit' });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
