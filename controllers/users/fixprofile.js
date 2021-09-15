const { Users } = require('../../models');
const { generateAccess, verifyAccess } = require('../../middlewares/token');
const { comparePassword, generatePassword } = require('../../middlewares/crypto');
// const { uploadImage } = require('../../middlewares/multer');

module.exports = async (req, res) => {
  const originAccessToken = req.headers.authorization.split(' ')[1];
  if (!originAccessToken) res.status(401).json({ message: 'token not found' });
  else {
    const accessTokenData = verifyAccess(originAccessToken);
    if (!accessTokenData) res.status(400).json({ message: 'token expired' });
    else {
      try {
        const { avatar, nickname, password, status } = req.body;
        const origin = await Users.findOne({
          where: { email: accessTokenData.email, nickname: accessTokenData.nickname }
        });
        // if (!comparePassword(password, origin.password)) res.status(403).json({ message: 'passwords are different' });
        const newPassword = generatePassword(password);
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
        // uploadImage(avatar);
        const accessToken = generateAccess({
          email: origin.email,
          nickname: nickname || origin.nickname
        });
        res.status(202).json({
          data: {
            accessToken,
            id: origin.id,
            avatar,
            userId: origin.userId,
            nickname,
            email: origin.email,
            status
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
