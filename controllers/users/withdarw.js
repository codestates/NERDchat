const { Users } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');

module.exports = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) res.status(401).json({ message: "token not found" });
  
  const accesTokenData = verifyAccess(accessToken)
  if (!accesTokenData) res.status(401).json({ message: "token expired" });
  else {
    try {
      // const userInfo = await Users.findOne({ where: { email: accesTokenData.email, nickaname: accesTokenData.nickaname } });
      await Users.destroy({ where: { email: accesTokenData.email, nickaname: accesTokenData.nickaname } });
      res.status(200).json({ message: "Success: Withdraw" });
    } catch (err) {
      console.log(err);
    }
  }
}