const { Users } = require('../../models');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
  try {
    const code = await axios({
      url: 'https://accounts.google.com/o/oauth2/token',
      method: 'post',
      data: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code: req.query.code,
        redirect_uri: `${process.env.ENDPOINT}/oauth/google`,
        grant_type: 'authorization_code'
      }
    });
    if (!code) res.status(400).json({ message: 'code not found' });
    else {
      const accessToken = code.data.access_token;
      const refreshToken = code.data.refresh_token;
      const userData = await axios({
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        method: 'get',
        params: {
          access_token: accessToken,
          scope: 'https://www.googleapis.com/auth/userinfo.email'
        }
      });
      const userInfo = await Users.findOne({ where: { userId: userData.data.sub } });
      // console.log(userInfo)
      if (!userInfo) {
        await Users.create({
          avatar: userData.data.picture,
          userId: userData.data.sub,
          nickname: userData.data.sub,
          email: userData.data.email,
          valid: false,
          oauth: 'Google',
          status: null,
          currentRoom: null,
          created_at: new Date(),
          updated_at: new Date()
        });
      }
      const expireDate = new Date(Date.now() + 60 * 60 * 1000 * 24);
      const payload = {
        avatar: userData.data.picture,
        userId: userData.data.sub,
        nickname: userData.data.sub,
        email: userData.data.email,
        valid: false,
        oauth: 'Google',
        status: null,
        currentRoom: null,
        created_at: new Date(),
        updated_at: new Date()
      };

      res
        .cookie('accessToken', accessToken, { httpOnly: true, expires: expireDate, sameSite: 'none', secure: true })
        .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'none', secure: true })
        .cookie('oauth', 'google', { httpOnly: true, sameSite: 'none', secure: true })
        .writeHead(200, { Location: process.env.Go_HOME + '/servers' });
      res.send({ data: { payload } });
      // res.redirect(200, process.env.GO_HOME + '/servers');
      // res.render(process.env.GO_HOME + '/servers', { data: payload });
    }
  } catch (err) {
    console.log(err);
  }
};
