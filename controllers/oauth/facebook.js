const { Users } = require('../../models');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) res.status(400).json({ message: 'code not found' });
    const data = await axios({
      url: 'https://graph.facebook.com/v12.0/oauth/access_token',
      method: 'get',
      params: {
        client_id: process.env.FACEBOOK_CLIENT_ID,
        redirect_uri: `${process.env.ENDPOINT}/oauth/facebook`,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET,
        code
      }
    });
    const accessToken = data.data.access_token;
    const userData = await axios({
      url: 'https://graph.facebook.com/me',
      method: 'get',
      params: {
        fields: 'id,name,email,picture',
        access_token: accessToken
      }
    });
    const userInfo = await Users.findOne({ where: { userid: userData.data.id } });
    if (!userInfo) {
      await Users.create({
        avatar: userData.data.picture.data.url,
        userId: userData.data.id,
        nickname: userData.data.id,
        email: userData.data.email,
        valid: false,
        oauth: 'Facebook',
        status: null,
        currentRoom: null,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    const expireDate = new Date(Date.now() + 60 * 60 * 1000 * 24);
    const payload = {
      avatar: userData.data.picture.data.url,
      userId: userData.data.id,
      nickname: userData.data.id,
      email: userData.data.email,
      valid: false,
      oauth: 'Facebook',
      status: null,
      currentRoom: null,
      created_at: new Date(),
      updated_at: new Date()
    };
    res.cookie('accessToken', accessToken, { httpOnly: true, expires: expireDate, sameSite: 'none', secure: true })
      .cookie('oauth', 'facebook', { httpOnly: true, sameSite: 'none', secure: true })
      .cookie('data', payload, { httpOnly: true, sameSite: 'none', secure: true }).redirect(
        process.env.GO_HOME + '/servers'
      );
  } catch (err) {
    console.log(err);
  }
};
// refreshtoken이 없어
