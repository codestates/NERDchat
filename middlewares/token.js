const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  generateAccess: (payload) => jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1d' }),
  generateRefresh: (payload) => jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' }),
  verifyAccess: (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) res.status(401).json({ message: 'token not found' });
    else {
      try {
        const userData = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        return userData;
      } catch (err) {
        res.status(400).json({ message: 'token exipred' });
        return null;
      }
    }
  },
  verifyRefresh: (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) res.status(401).json({ message: 'token not found' });
    else {
      try {
        const userData = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        return userData;
      } catch (err) {
        res.status(400).json({ message: 'token exipred' });
        return null;
      }
    }
  }
};
