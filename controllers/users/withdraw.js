const { Users } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');

module.exports = async (req, res) => {
  const accessToken = req.headers.authorization.split(' ')[1];
  if (!accessToken) res.status(401).json({ message: 'token not found' });

  const accesTokenData = verifyAccess(accessToken);
  if (!accesTokenData) res.status(401).json({ message: 'token expired' });
  else {
    try {
      const { email, nickname } = accesTokenData;
      await Users.destroy({ where: { email, nickname } });
      res.status(200).json({ message: 'Success: Withdraw' });
    } catch (err) {
      console.log(err);
    }
  }
};
