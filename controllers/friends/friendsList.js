const { Friends, Users } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const userData = await verifyAccess(req, res);
  if (userData) {
    const friendsList = await Friends.findAll({
      where: {
        isValid: true,
        [Op.or]: [
          { user1id: userData.id },
          { user2id: userData.id }
        ]
      }
    });
    const listSort = [];
    friendsList.map((el) => {
      if (el.user1id === userData.id) listSort.push(el.user2id);
      else if (el.user2id === userData.id) listSort.push(el.user1id);
    });
    const findUsers = await Users.findAll({
      where: { id: { [Op.in]: listSort } },
      attributes: ['id', 'avatar', 'userId', 'nickname']
    });
    res.status(200).json({ data: findUsers });
  }
};
