const bcrypt = require('bcrypt');
const saltOrRounds = 10;

module.exports = {
  generatePassword: (pw) => bcrypt.hashSync(pw, saltOrRounds),
  // comparePassword => return Boolean
  comparePassword: (pw, hash) => bcrypt.compareSync(pw, hash)
};
