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
      subject: '마음을 불태워라',
      text: String(verifyToken)
    }, (err) => {
      console.log(err);
    });
    res.status(200).json({ data: { verifyToken } });
  } catch (err) {
    console.log(err);
  }
};
