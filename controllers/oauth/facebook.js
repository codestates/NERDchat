const { Users } = require('../../models');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
  try {
    await axios.get('https://graph.facebook.com/v12.0/oauth/access_token', {
      params: {
        client_id: process.env.FACEBOOK_CLIENT_ID,
        redirect_uri: 'http://localhost:8080/oauth/facebook',
        client_secret: process.env.FACEBOOK_CLIENT_SECRET,
        code: req.query.code
      }
    }).then(async result => {
    // console.log(result.data);
      const accessToken = result.data.access_token;
      const userData = await axios.get('https://graph.facebook.com/me', {
        params: {
          fields: 'id,name,email,picture',
          access_token: accessToken
        }
      }).then(result => console.log(result.data.email));
      const userInfo = Users.findOne({ where: { email: userData.email } });
      if (!userInfo) {
        const payload = {
          avatar: userData.picture,
          userId: userData.id,
          nickname: userData.id,
          email: userData.email,
          valid: false,
          oauth: 'Facebook',
          status: null,
          currentRoom: null,
          created_at: new Date(),
          updated_at: new Date()
        };
        await Users.create({ payload });
        res.cookie('accessToken', accessToken, { httpOnly: true, expires: expireDate, sameSite: 'none', secure: true })
          .status(200).json({
            data: {
              accessToken,
              id,
              avatar: payload.avatar,
              userId: payload.userId,
              nickname: payload.nickname,
              email: payload.email,
              oauth: payload.oauth,
              status: payload.status
            }
          });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
// refreshtoken이 없어
