const { Friends } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');

module.exports = async (req, res) => {
  const userData = verifyAccess(req, res);
  if (userData) {
  const reqestList = await Friends.findAll({ where: { user2id: userData.id } });
  if (!reqestList) res.status(404).json({ message: 'Requests not found' });
  res.status(200).json({ data: reqestList });
  }
};
