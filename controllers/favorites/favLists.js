const { Favorites, GameCategory } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');

module.exports = async (req, res) => {
  const userData = verifyAccess(req, res);
  if (userData) {
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
};
