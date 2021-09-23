const { Friends, Users } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const userData = verifyAccess(req, res);
  if (userData) {
  const recipient = await Users.findOne({ where: { nickname: req.params.nickname } });
  if (!recipient) res.status(404).json({ message: 'User not found' });
  if (req.body) {
    await Friends.update(
      { isValid: true, updatedAt: new Date() },
      { where: { [Op.and]: [{ user1id: recipient.id, user2id: userData.id }] } }
    );
    res.status(200).json({
      data: {
        user1id: userData.id,
        user2id: recipient.id,
        isValid: true
      }
    });
  } else {
    await Friends.destroy({ where: { [Op.and]: [{ user1id: recipient.id, user2id: userData.id }] } });
    res.status(200).json({
      data: {
        user1id: userData.id,
        user2id: recipient.id,
        isValid: false
      }
    });
  }
}
};
