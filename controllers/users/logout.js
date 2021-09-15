const { verifyAccess } = require('../../middlewares/token');

module.exports = (req, res) => {
  res.status(200).cookie('accessToken', '', { sameSite: 'none', httpOnly: true, secure: true }).json({ isLogout: true });
};
