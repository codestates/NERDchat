const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res) => {
  res.status(200)
    .cookie('refreshToken', '', { Domain: process.env.ORIGIN, sameSite: 'none', secure: true })
    .cookie('accessToken', '', { Domain: process.env.ORIGIN, sameSite: 'none', secure: true }).json({ isLogout: true });
};
