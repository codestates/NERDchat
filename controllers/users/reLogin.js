const { Users } = require('../../models');
const jwt = require('jsonwebtoken');
const { generateAccess } = require('../../middlewares/token');
const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
  const { oauth } = req.body;
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  if (!accessToken) res.status(401).json({ message: 'access token not found' });
  else {
    switch (oauth) {
      case 'none':
        const accessData = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        if (accessData) res.status(200).json({ message: 'ok' });
        else {
          const refreshData = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
          if (!refreshData) res.status(400).json({ message: 'refresh token expired' });
          else {
            const findUser = await Users.findOne({
              where: {
                id: refreshData.id
              }
            });
            const { id, avatar, userId, nickname, email, oauth, status } = findUser;
            const newAccessToken = generateAccess({ id, avatar, userId, nickname, email, oauth, status });
            const expireDate = new Date(Date.now() + 60 * 60 * 1000 * 24);
            res.cookie('accessToken', newAccessToken, { httpOnly: true, expires: expireDate, sameSite: 'none', secure: true })
              .status(200).json({
                data: { accessToken: newAccessToken, id, avatar, userId, nickname, email, oauth, status }
              });
          }
        }
        break;
      case 'kakao':
        break;
      case 'google':
        break;
    }
  }
};
