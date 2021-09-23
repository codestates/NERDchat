const jwt = require('jsonwebtoken');
const axios = require('axios');
const {Users} = require('../models')
require('dotenv').config();

module.exports = {
  generateAccess: (payload) => jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1d' }),
  generateRefresh: (payload) => jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' }),
  verifyAccess: async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const oauth = req.cookies.oauth;
    if (!accessToken) res.status(401).json({ message: 'token not found' });
    else {
      switch(oauth) {
        case 'none':
          try {
            const userData = jwt.verify(accessToken, process.env.ACCESS_SECRET);
            return userData;
          } catch (err) {
            res.status(400).json({ message: 'token expired' });
            return null;
          }

        case 'kakao':
          try {
            const kakaoData = await axios({
              url: 'https://kapi.kakao.com/v2/user/me',
              method: 'GET',
              params: { access_token: accessToken }
            });
            if(!kakaoData.data) {
              res.status(400).json({ message: 'token expired' });
              return null;
            }
            else {
              const userData = await Users.findOne({where: {userId: kakaoData.data.properties.nickname}})
              const payload = {
                id: userData.id, avatar: userData.avatar, userId: userData.userId,
                nickname: userData.nickname, email: userData.email, oauth: userData.oauth, status: userData.status
              }
              return payload
              // id, avatar, userId, nickname, email, oauth, status
            }
          } catch (err) {
            res.status(400).json({message: 'token expired'});
            return null;
          }

        case 'google':
          try {
            const googleData = await axios({
              url: 'https://www.googleapis.com/oauth2/v3/userinfo',
              method: 'GET',
              params: {
                access_token: accessToken,
                scope: 'https://www.googleapis.com/auth/userinfo.email'
              }
            });
            if(!googleData.data) {
              res.status(400).json({ message: 'token expired' });
              return null;
            }
            else {
              const userData = await Users.findOne({ where: { userId: googleData.data.sub } });
              const payload = {
                id: userData.id, avatar: userData.avatar, userId: userData.userId,
                nickname: userData.nickname, email: userData.email, oauth: userData.oauth, status: userData.status
              }
              return payload
            }
          } catch (err) {
            res.status(400).json({message: 'token expired'})
            return null;
          }
        
        case 'facebook':
          try {
            const fbData = await axios({
              url: 'https://graph.facebook.com/me',
              method: 'GET',
              params: {
                fields: 'id,name,email,picture',
                access_token: accessToken
              }
            });
            if(!fbData.data) {
              res.status(400).json({ message: 'token expired' });
              return null;
            }
            else {
              const userData = await Users.findOne({ where: { userId: fbData.data.sub } });
              const payload = {
                id: userData.id, avatar: userData.avatar, userId: userData.userId,
                nickname: userData.nickname, email: userData.email, oauth: userData.oauth, status: userData.status
              }
              return payload
            }
          } catch (err) {
            res.status(400).json({message: 'token expired'})
            return null;
          }
      }
    }
  },
};
