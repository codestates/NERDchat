const { Users } = require('../../models');
const axios = require('axios');
const { generateAccess, generateRefresh } = require('../../middlewares/token');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
  const googleLoginUrl = 'https://accounts.google.com/o/oauth2/token';
  // console.log(req.query);
  try {
    // const google = await axios.post(googleLoginUrl, {
    //   client_id: process.env.GOOGLE_CLIENT_ID,
    //   client_sercret: process.env.GOOGLE_CLIENT_SECRET,
    //   code: req.query.code,
    //   redirect_uri: 'https://localhost:3000/oauth/google',
    //   grant_type: 'authorization_code'
    // })
    const googleCode = await axios({
      url: 'https://oauth2.googleapis.com/token',
      method: 'post',
      data: {
        code: req.query.code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: 'http://localhost:8080/oauth/google',
        grant_type: 'authorization_code'
      }
    });
    console.log(googleCode.data.access_token);
  } catch (err) {
    console.log(err);
  }
};
