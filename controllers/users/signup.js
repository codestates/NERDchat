const { Users } = require('../../models');
const { generatePassword } = require('../../middlewares/crypto');

module.exports = async (req, res) => {
  const { id, password, email, nickname } = req.body;
  if (!id || !password || !email || !nickname) res.status(400).json({ isSignup: false });

  const userInfo = await Users.findOne({ where: { email } });
  if (userInfo) res.status(400).json({ isSignup: false });
  else {
    try {
      const newPassword = generatePassword(password);
      await Users.create({
        userId: id,
        avatar: null,
        email,
        nickname,
        password: newPassword,
        valid: false, // valid가 뭐하는 거더라?
        oauth: 'none',
        satatus: null,
        currentRoom: null,
        created_at: new Date(),
        updated_at: new Date()
      });
      res.status(201).json({ isSignup: true });
    } catch (err) {
      console.log(err);
    }
  }
};
