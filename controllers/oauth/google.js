const { Users } = require('../../models');
const axios = require('axios');
const { generateAccess, generateRefresh } = require('../../middlewares');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
  const googleLoginUrl = 'https://accounts.google.com/o/oauth2/token';
  await axios.post(googleLoginUrl, {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_sercret: process.env.GOOGLE_CLIENT_SECRET,
    code: req.query.code,
    redirect_uri: 'https://localhost:3000/oauth/google',
    grant_type: 'authorization_code'
  })
    .then(result => {

    });
};
