const { GameCategory } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');

module.exports = async (req, res) => {
  const userData = verifyAccess(req, res);
  const uuid = req.params.uuid;
  if (!userData.superuser) res.status(403).json({ message: 'not admin' });
  else {
    try {
      await GameCategory.destory({ where: { uuid } });
      res.status(202).json({ message: 'delete room' });
    } catch (err) {
      console.log(err);
    }
  }
};
