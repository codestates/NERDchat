const { Users } = require('../../models');
const { generateAccess, verifyAccess } = require('../../middlewares/token');
const { generatePassword } = require('../../middlewares/crypto');

module.exports = async (req, res) => {
  try {
    const userData = await verifyAccess(req, res);
    const { nickname, password, status } = req.body;
    const expireDate = new Date(Date.now() + 60 * 60 * 1000 * 24);
    const avatar = req.file ? req.file.location : null;
    let { oauth, accessToken } = req.cookies;
    const origin = await Users.findOne({
      where: { email: userData.email, nickname: userData.nickname }
    })
    if (password) {
      var newPassword = generatePassword(password);
    }
    const payload = {
      id: origin.id,
      email: origin.email,
      userId: origin.userId,
      avatar: avatar || origin.avatar,
      nickname: nickname || origin.nickname,
      password: newPassword || origin.password,
      status: status || origin.status,
      oauth
    }
    await Users.update({
      avatar: avatar || origin.avatar,
      nickname: nickname || origin.nickname,
      password: newPassword || origin.password,
      status: status || origin.status,
      updatedAt: new Date()
    },
    {
      where: {
        id: origin.id
      }
      });
    if (oauth === 'none') accessToken = generateAccess(payload);
    res.cookie('accessToken', accessToken, { httpOnly: true, expires: expireDate, sameSite: 'none', secure: true })
      .status(202).json({
        data: {
          accessToken,
          id: origin.id,
          email: origin.email,
          avatar: avatar || origin.avatar,
          userId: origin.userId,
          nickname: nickname || origin.nickname,
          status: status || origin.status,
          oauth
        }
      });
  } catch (err) {
    console.log(err);
  }
};