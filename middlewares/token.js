const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  generateAccess: (payload) => jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1d' }),
  generateRefresh: (payload) => jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' }),
  verifyAccess: (accessToken) => {
    try {
      return jwt.verify(accessToken, process.env.ACCESS_SECRET);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },
  verifyRefresh: (refreshToken) => {
    try {
      return jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

};
