const { GameChatRooms } = require('../../models');
const sequelize = require('sequelize');
const op = sequelize.Op;

module.exports = async (req, res) => {
  const search = req.params.title || null;
  const data = await GameChatRooms.findAll({
    where: {
      roomTitle: {
        [op.like]: '%' + search + '%'
      }
    }
  });
  if (data) res.status(200).json(data);
  else res.status(404).json({ message: 'no data' });
};
