const { Users } = require('../../models');
const axios = require('axios');
const { generateAccess, generateRefresh } = require('../../middlewares/token');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
  const googleLoginUrl = 'https://accounts.google.com/o/oauth2/token';
  // console.log(req.query);
  try {
    await axios.post(googleLoginUrl, {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code: req.query.code,
      redirect_uri: 'http://localhost:8080/oauth/google',
      grant_type: 'authorization_code'
    })
      .then(async result => {
        const accessToken = result.data.access_token;
        const refreshToken = result.data.refresh_token;
        const userData = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        })
          .then(result => console.log(result.data));
        const userInfo = await Users.findOne({ where: { email: userData.email } });
        if (!userInfo) {
          const payload = {
            avatar: userData.picture,
            userId: userData.sub,
            nickname: userData.sub,
            email: userData.email,
            valid: false,
            oauth: 'Google',
            status: null,
            currentRoom: null,
            created_at: new Date(),
            updated_at: new Date()
          };
          await Users.create({
            avatar: userData.picture,
            userId: userData.sub,
            nickname: userData.sub,
            email: userData.email,
            valid: false,
            oauth: 'Google',
            status: null,
            currentRoom: null,
            created_at: new Date(),
            updated_at: new Date()
          });
        }
      });
  } catch (err) {

  }
};
