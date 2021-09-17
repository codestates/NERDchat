const { Users } = require('../../models');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
  try {
    const code = req.query.code;
    console.log(code);
    await axios.post('https://kauth.kakao.com/oauth/token', {
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: 'http://localhost:8080/oauth/kakao',
        code
      }
    })
      .then(async result => {
        console.log(result.data.access_token);
        //     const access_token = result.data.access_token;
        // const userData = await axios.get('https://kapi.kakao.com/v2/user/me', {
        //   params: {
        //     access_token
        //   }
        // }).then(result => console.log(result.data));
        // const userInfo = Users.findOne({ where: { email: userData.data.kakao_account.email } });
        // if (!userInfo) {
        //   const payload = {

      //   }
      // }
      });
  } catch (err) {
    console.log(err);
  }
};
