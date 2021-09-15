const { Friends, Users } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const userData = verifyAccess(req, res);
  if (!userData) {
    return res.status(400).send('Error');
  }
  const friendsList = await Friends.findAll({
    where: {
      isValid: true,
      [Op.or]: [
        { user1id: userData.id },
        { user2id: userData.id }]
    },
    include: {
      model: Users,
      attributes: ['id', 'avatar', 'nickname']
    }
  });
  res.status(200).json({ data: friendsList });
};
