const { Users } = require('../../models');

module.exports = async (req, res) => {
  try {
    const userInfo = await Users.findOne({ where: { nickname: req.params.nickname } });
    if (!userInfo) res.status(404).json({ profile: 'not found' });
    else {
      const { avatar, userId, nickname, email, status } = userInfo;
      res.status(200).json({
        data: {
          avatar,
          userId,
          nickname,
          email,
          status
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};
