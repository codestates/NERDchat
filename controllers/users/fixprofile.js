const { Users } = require('../../models');
const { generateAccess, verifyAccess } = require('../../middlewares/token');
const { generatePassword } = require('../../middlewares/crypto');

module.exports = async (req, res) => {
  const userData = verifyAccess(req, res);
  const { nickname, password, status } = req.body;
  const avatar = req.files[0].filename;
  try {
    const origin = await Users.findOne({
      where: { email: userData.email, nickname: userData.nickname }
    });
    if (password) {
      var newPassword = generatePassword(password);
    }
    await Users.update({
      avatar: avatar.location || origin.avatar,
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
    const accessToken = generateAccess({
      email: origin.email,
      nickname: nickname || origin.nickname
    });
    const expireDate = new Date(Date.now() + 60 * 60 * 1000 * 24);

    res.cookie('accessToken', accessToken, { httpOnly: true, expires: expireDate, sameSite: 'none', secure: true })
      .status(202).json({
        data: {
          accessToken,
          id: origin.id,
          avatar: avatar || origin.avatar,
          userId: origin.userId,
          nickname: nickname || origin.nickname,
          email: origin.email,
          status: status || origin.status
        }
      });
  } catch (err) {
    console.log(err);
  }
};
