const { Friends, Users } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const userData = verifyAccess(req, res);
  if (!userData) return res.status(400).send('Error');
  const recipient = await Users.findOne({ where: { nickname: req.params.nickname } });
  if (!recipient) res.status(404).json({ message: 'User not found' });
  const isFriend = await Friends.findOne({
    where: {
      [Op.or]: [
        {
          [Op.and]: [{ user1id: userData.id, user2id: recipient.id }]
        },
        {
          [Op.and]: [{ user1id: recipient.id, user2id: userData.id }]
        }
      ]
    }
  });
  console.log(isFriend);
  if (isFriend) res.status(400).json({ message: 'exist' });
  else {
    const payload = {
      user1id: userData.id,
      user2id: recipient.id,
      isValid: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    await Friends.create(payload);
    res.status(201).json({ data: payload });
  }
};
