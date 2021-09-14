const { Favorites, GameCategory } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');

module.exports = async (req, res) => {
  const token = req.headers.authorization || null;
  if (!token) res.status(401).json({ message: 'token not found' });
  else {
    const userData = verifyAccess(token.split(' ')[1]);
    if (!userData) res.status(400).json({ message: 'token expired' });
    else {
      const data = await Favorites.findAll({
        where: { userId: userData.id },
        attributes: ['gameId'],
        include: {
          model: GameCategory,
          attributes: ['category', 'image']
        }
      });
      res.status(200).json({ data });
    }
  }
};
