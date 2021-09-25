const { Users } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');

module.exports = async (req, res) => {
  const userData = await verifyAccess(req, res);
  if (userData) {
    try {
      const { email, nickname } = userData;
      await Users.destroy({ where: { email, nickname } });
      res.status(200).json({ message: 'Success: Withdraw' });
    } catch (err) {
      console.log(err);
    }
  }
}
};
