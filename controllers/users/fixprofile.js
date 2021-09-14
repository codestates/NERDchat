const { Users } = require('../../models');
const { generateAccess, verifyAccess } = require('../../middlewares/token');
const { comparePassword, generatePassword } = require('../../middlewares/crypto');

module.exports = async (req, res) => {
  const origin_accessToken = req.cookies.accessToken;
  if (!origin_accessToken) res.status(401).json({ message: 'token not found' });
  else {
    const accessTokenData = verifyAccess(origin_accessToken);
    if (!accessTokenData) res.status(400).json({ message: 'token expired' });
    else {
      try {
        const { avatar, nickname, password, status } = req.body;
        const origin = await Users.findOne({
          where: { email: accessTokenData.email, nickname: accessTokenData.nickname }
        });
        const { id, userId } = origin;
        if (!comparePassword(password, origin.password)) res.status(403).json({ message: 'passwords are different' });
        else {
          const new_password = generatePassword(password);
          await Users.update({
            avatar: avatar || origin.avatar,
            nickname: nickname || origin.nickname,
            password: password || new_password,
            status: status || origin.status,
            updatedAt: new Date()
          },
          {
            where: {
              id: origin.id
            }
          });
          const originEmail = origin.email;
          const accessToken = generateAccess({
            email: originEmail,
            nickname: nickname || origin.nickname
          });
          res.status(202).json({
            data: {
              accessToken,
              id,
              avatar,
              userId,
              nickname,
              originEmail,
              status
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
