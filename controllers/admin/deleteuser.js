const { Users } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');

module.exports = async (req, res) => {
  const userData = verifyAccess(req, res);
  const id = req.params.id;
  if (!userData.superuser) res.status(403).json({ message: 'not admin' });
  else {
    try {
      await Users.destory({ where: { id } });
      res.status(202).json({ message: 'delete user' });
    } catch (err) {
      console.log(err);
    }
  }
};
