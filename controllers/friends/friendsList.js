const { Friends, Users } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const token = req.headers.authorization || null;
  if (!token) res.status(401).json({ message: 'token not found' });
  else {
    const userData = verifyAccess(token.split(' ')[1]);
    if (!userData) res.status(400).json({ message: 'token expired' });
    else {
      const friendsList = await Friends.findAll({
        where: {
          isValid: true,
          [Op.or]: [
            { user1id: userData.id },
            { user2id: userData.id }],
        },include: {
            model: Users,
            attributes: ['id', 'avatar', 'nickname']
          }
      });
      res.status(200).json({ data: friendsList });
    }
  }
};
