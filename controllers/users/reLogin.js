const { Users } = require('../../models');
const jwt = require('jsonwebtoken');
const { generateAccess } = require('../../middlewares/token');
const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
  const oauth = req.cookies.oauth;
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  const expireDate = new Date(Date.now() + 60 * 60 * 1000 * 24);
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
            try {
              const findUser = await Users.findOne({
                where: {
                  id: refreshData.id
                }
              });
              const { id, avatar, userId, nickname, email, oauth, status } = findUser;
              const newAccessToken = generateAccess({ id, avatar, userId, nickname, email, oauth, status });
              res.cookie('accessToken', newAccessToken, { domain: process.env.ORIGIN, expires: expireDate, sameSite: 'none', secure: true })
                .status(200).json({
                  data: { accessToken: newAccessToken, id, avatar, userId, nickname, email, oauth, status }
                });
            } catch (e) {
              console.log(e);
            }
          }
        }
        break;
      case 'kakao':
        const kakaoAccessToken = await axios({
          url: 'https://kauth.kakao.com/oauth/token',
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: {
            grant_type: 'refresh_token',
            client_id: process.env.KAKAO_REST_API_KEY,
            refresh_token: refreshToken
          }
        });
        if (!kakaoAccessToken.access_token) {
          res.status(400).json({ message: 'kakao refresh token expired' });
        } else {
          try {
            const userData = await axios({
              url: 'https://kapi.kakao.com/v2/user/me',
              method: 'GET',
              params: { access_token: kakaoAccessToken.access_token }
            });
            const userInfo = Users.findOne({ where: { userId: userData.data.properties.nickname } });
            res.cookie('accessToken', kakaoAccessToken.access_token, { domain: process.env.ORIGIN, expires: expireDate, sameSite: 'none', secure: true })
              .status(200).json({
                data: {
                  accessToken: kakaoAccessToken.access_token,
                  id: userInfo.id,
                  avatar: userInfo.avatar,
                  userId: userInfo.userId,
                  nickname: userInfo.nickname,
                  email: userInfo.email,
                  oauth: userInfo.oauth,
                  status: userInfo.status
                }
              });
          } catch (e) {
            console.log(e);
          }
        }
        break;
      case 'google':
        const googleAccessToken = await axios({
          url: 'https://googleapis.com/oauth2/v4/token',
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: {
            grant_type: 'refresh_token',
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            refresh_token: refreshToken
          }
        });
        if (!googleAccessToken.access_token) {
          res.status(400).json({ message: 'google refresh token expired' });
        } else {
          try {
            const userData = await axios({
              url: 'https://www.googleapis.com/oauth2/v3/userinfo',
              method: 'GET',
              params: {
                access_token: googleAccessToken.access_token,
                scope: 'https://www.googleapis.com/auth/userinfo.email'
              }
            });
            const userInfo = await Users.findOne({ where: { userId: userData.data.sub } });
            res.cookie('accessToken', googleAccessToken.access_token, { domain: process.env.ORIGIN, expires: expireDate, sameSite: 'none', secure: true })
              .status(200).json({
                data: {
                  accessToken: googleAccessToken.access_token,
                  id: userInfo.id,
                  avatar: userInfo.avatar,
                  userId: userInfo.userId,
                  nickname: userInfo.nickname,
                  email: userInfo.email,
                  oauth: userInfo.oauth,
                  status: userInfo.status
                }
              });
          } catch (e) {
            console.log(e);
          }
        }
        break;
    }
  }
};
