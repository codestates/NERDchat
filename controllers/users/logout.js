const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res) => {
  res.status(200)
    .cookie('refreshToken', '', { Domain: process.env.ORIGIN, sameSite: 'none', httpOnly: true, secure: true })
    .cookie('accessToken', '', { Domain: process.env.ORIGIN, sameSite: 'none', httpOnly: true, secure: true }).json({ isLogout: true });
};
