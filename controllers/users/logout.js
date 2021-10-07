const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res) => {
  res.status(200)
    .clearCookie('refreshToken')
    .clearCookie('accessToken')
    .clearCookie('oauth')
    .json({ isLogout: true });
};
