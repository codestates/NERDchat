const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res) => {
  res.status(200)
    .cookie('refreshToken', '', { domain: process.env.ORIGIN, sameSite: 'none', secure: true })
    .cookie('accessToken', '', { domain: process.env.ORIGIN, sameSite: 'none', secure: true })
    .cookie('userInfo', '', { domain: process.env.ORIGIN, sameSite: 'none', secure: true })
    .json({ isLogout: true });
};
