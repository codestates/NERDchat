const { Users } = require('../../models');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) res.status(400).json({ message: 'code not found' });
    const data = await axios({
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: 'http://localhost:8080/oauth/kakao',
        code
      }
    });
    const accessToken = data.data.access_token;
    const refreshToken = data.data.refresh_token;
    console.log(data.data.access_token);
    const userData = await axios({
      url: 'https://kapi.kakao.com/v2/user/me',
      method: 'get',
      params: { access_token: accessToken }
    });
    const userInfo = Users.findOne({ where: { email: userData.data.kakao_account.email } });
    if (!userInfo) {
      const expireDate = new Date(Date.now() + 60 * 60 * 1000 * 24);
      const payload = {
        avatar: userData.data.properties.profile_image,
        userId: userData.data.properties.nickname,
        nickname: userData.data.properties.nickname,
        email: userData.data.kakao_account.email,
        valid: false,
        oauth: 'Kakao',
        status: null,
        currentRoom: null,
        created_at: new Date(),
        updated_at: new Date()
      };
      await Users.create({ payload });
      res.cookie('accessToken', accessToken, { httpOnly: true, expires: expireDate, sameSite: 'none', secure: true })
        .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'none', secure: true })
        .status(200).json({
          data: {
            accessToken,
            // id,
            avatar: payload.avatar,
            userId: payload.userId,
            nickname: payload.nickname,
            email: payload.email,
            oauth: payload.oauth,
            status: payload.status
          }
        });
    }
  } catch (err) {
    console.log(err);
  }
};
// {
//   profile_nickname_needs_agreement: false,
//   profile_image_needs_agreement: false,
//   profile: {
//     nickname: '박상엽',
//     thumbnail_image_url: 'http://k.kakaocdn.net/dn/dbS0gJ/btqq9NBO7wV/S4KIWg0pQaQG2V2vy0grK0/img_110x110.jpg',
//     profile_image_url: 'http://k.kakaocdn.net/dn/dbS0gJ/btqq9NBO7wV/S4KIWg0pQaQG2V2vy0grK0/img_640x640.jpg',
//     is_default_image: false
//   },
//   has_email: true,
//   email_needs_agreement: false,
//   is_email_valid: true,
//   is_email_verified: true,
//   email: 'piter1120@hanmail.net'
// }
