const { Users } = require('../../models');
const { comparePassword } = require('../../middlewares/crypto');
const { generateAccess, generateRefresh } = require('../../middlewares/token');

module.exports = async (req, res) => {
  const { id, password } = req.headers;
  console.log(id);
  const userData = await Users.findOne({
    where: { userId: id, oauth: 'none' }
  });
  if (!userData) res.status(404).json({ isLogin: false, message: 'user not found' });
  else if (!comparePassword(password, userData.password)) res.status(400).json({ isLogin: false });
  else {
    const { id, avatar, userId, nickname, email, oauth, status } = userData;
    const accessToken = generateAccess({ id, avatar, userId, nickname, email, oauth, status });
    const refreshToken = generateRefresh({ id, avatar, userId, nickname, email, oauth, status });
    const expireDate = new Date(Date.now() + 60 * 60 * 1000 * 24);

    res.cookie('accessToken', accessToken, { httpOnly: true, expires: expireDate, sameSite: 'none', secure: true })
      .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'none', secure: true })
      .status(200).json({
        data: { accessToken, id, avatar, userId, nickname, email, oauth, status },
        isLogin: true
      });
  }

  // Search User Data
  /*
    const userData = await Users.findOne({where: {userId: id}});
    if(!id) res.status(404).json({ isLogin: false, message: "user not found" });
    else {

    }
   */
};
