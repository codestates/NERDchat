// require Model Code
const { comparePassword } = require('../../middlewares/crypto');
const { generateAccess, generateRefresh } = require('../../middlewares/token');

module.exports = async (req, res) => {
  const {id, password} = req.headers
  // Search User Data
  /*
    const userData = await Users.findOne({where: {userId: id}});
    if(!id) res.status(404).json({ isLogin: false, message: "user not found" });
    else {
        
    }
   */
};
