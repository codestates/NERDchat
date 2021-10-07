const { Users } = require("../../models");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
  try {
    const code = req.body.code;
    const expireDate = new Date(Date.now() + 60 * 60 * 1000 * 24);
    const data = await axios({
      url: "https://kauth.kakao.com/oauth/token",
      params: {
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: `http://localhost:3000/callback`,
        code,
      },
    });
    const accessToken = data.data.access_token;
    const refreshToken = data.data.refresh_token;
    const userData = await axios({
      url: "https://kapi.kakao.com/v2/user/me",
      method: "get",
      params: { access_token: accessToken },
    });

    let payload;
    const userInfo = await Users.findOne({
      where: { userId: userData.data.id },
    });

    if (!userInfo) {
      await Users.create({
        avatar: userData.data.properties.profile_image,
        userId: userData.data.id,
        nickname: userData.data.id,
        email: userData.data.kakao_account.email || null,
        valid: false,
        oauth: "Kakao",
        status: null,
        currentRoom: null,
        created_at: new Date(),
        updated_at: new Date(),
      });
      payload = {
        avatar: userData.data.properties.profile_image,
        userId: userData.data.id,
        nickname: userData.data.id,
        email: userData.data.kakao_account.email || null,
        valid: false,
        oauth: "Kakao",
        status: null,
        currentRoom: null,
        created_at: new Date(),
        updated_at: new Date(),
      };
    }
    const send = payload || userInfo;
    console.log(77, "This is payload", payload, userInfo);
    res
      .cookie("accessToken", accessToken, {
        expires: expireDate,
        sameSite: "none",
        secure: true,
      })
      .cookie("refreshToken", refreshToken, { sameSite: "none", secure: true })
      .cookie("oauth", "kakao", { sameSite: "none", secure: true })
      .cookie("userInfo", send, {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({ messages: "loggedIn" });
    // .header("Access-Control-Allow-Origin", "http://localhost:8080")
    // .header("origin", true)
    // .redirect(process.env.GO_HOME + "/servers");
  } catch (err) {
    console.log(err);
  }
};
