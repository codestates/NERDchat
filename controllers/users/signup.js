const { Users } = require('../../models');
const { generatePassword } = require('../../middlewares/crypto');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const { id, password, email, nickname } = req.body;
  try {
    if (!id || !password || !email || !nickname) res.status(202).json({ isSignup: false, message: 'not enough information' });
    const userInfo = await Users.findOne({
      where: {
        [Op.or]: [
          { email }, { userId: id }, { nickname }
        ]
      }
    });
    if (userInfo.email === email) res.status(208).json({ isSignup: false, message: 'duplicate email' });
    if (userInfo.userId === id) res.status(208).json({ isSignup: false, message: 'duplicate userId' });
    if (userInfo.nickname === nickname) res.status(208).json({ isSignup: false, message: 'duplicate nickname' });
    const newPassword = generatePassword(password);
    await Users.create({
      userId: id,
      avatar: null,
      email,
      nickname,
      password: newPassword,
      valid: false,
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
};
