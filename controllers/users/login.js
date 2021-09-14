const { Users } = require('../../models');
const { comparePassword } = require('../../middlewares/crypto');
const { generateAccess, generateRefresh } = require('../../middlewares/token');

module.exports = async (req, res) => {
  const { id, password } = req.headers;
  const userData = await Users.findOne({
    where: { userId: id }
  });
  if (!userData) res.status(404).json({ isLogin: false, message: 'user not found' });
  else if (!comparePassword(password, userData.password)) res.status(400).json({ isLogin: false });
  else {
    const { id, avatar, userId, nickname, email, oauth, status } = userData;
    const accessToken = generateAccess({ email, nickname });
    const refreshToken = generateRefresh({ email, nickname });

    res.set({ refreshToken: refreshToken });
    res.status(200).json({
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
