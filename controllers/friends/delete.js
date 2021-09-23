const { Friends, Users } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const userData = verifyAccess(req, res);
  if (userData) {
  const friend = await Users.findOne({ where: { nickname: req.params.nickname } });
  if (!friend) res.status(404).json({ message: 'Friend not found' });
  await Friends.destroy({
    where: {
      [Op.or]: [
        {
          [Op.and]: [{ user1id: userData.id, user2id: friend.id }]
        },
        {
          [Op.and]: [{ user1id: friend.id, user2id: userData.id }]
        }
      ]
    }
  });
  res.status(202).json({ message: 'Success Delete' });
}
};
