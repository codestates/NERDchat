const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
  const userEmail = req.body.email;
  let verifyToken = Math.floor(Math.random() * 1000000) + 100000;
  if (verifyToken > 1000000) {
    verifyToken = verifyToken - 100000;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    prot: 587,
    host: 'smtp.gmlail.com',
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD
    }
  });
  try {
    await transporter.sendMail({
      from: 'lotusrb0204@gmail.com',
      to: userEmail,
      subject: '[NERDCHAT]가입을 환영합니다.',
      // text: String(너드챗),
      html:
        '<h1 align="center">반갑습니다 :-)</h1>' + '<center style="line-height:200%"><h3 style="color:#8e00ff; display:inline;line-height:200%">NERDCHAT</h3>' + `<h3 style="display:inline">은 게임을 조금 더 즐겁게 즐기고 싶은 유저들을 위한 공간입니다.</h3></center> <h3 align="center">함께 즐길 준비 되셨나요? 준비가 되셨다면 인증번호를 입력해주세요.</h3>
        <center><span align="center", style="font-size:1.5em;"> 인증번호 : ` +
        `${verifyToken}` + '</span></center>'

      // + '<img src="">'

    }, (err) => {
      console.log(err);
    });
    res.status(200).json({ data: { verifyToken } });
  } catch (err) {
    console.log(err);
  }
};
