const { Favorites, GameCategory } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');

module.exports = async (req, res) => {
  const token = req.headers.authorization || null;
  if (!token) res.status(401).json({ message: 'token not found' });
  else {
    const userData = verifyAccess(token.split(' ')[1]);
    if (!userData) res.status(400).json({ message: 'token expired' });
    else {
      const gameId = req.params.gameId;
      const check = await GameCategory.findOne({ where: { id: gameId } });
      if (check) {
        const data = await Favorites.findOne({
          where: { userId: userData.id, gameId },
          attributes: ['gameId'],
          include: {
            model: GameCategory,
            attributes: ['category', 'image']
          }
        });
        if (data) {
          await Favorites.destroy({ where: { userId: userData.id, gameId } });
          res.status(200).json({ data: { data, state: false } });
        } else {
          await Favorites.create({
            userId: userData.id,
            gameId,
            createdAt: new Date(),
            updatedAt: new Date()
          });
          const create = await Favorites.findOne({
            where: { userId: userData.id, gameId },
            attributes: ['gameId'],
            include: {
              model: GameCategory,
              attributes: ['category', 'image']
            }
          });
          res.status(200).json({ data: { data: create, state: true } });
        }
      } else {
        res.status(404).json({ message: 'Favorites not found' });
      }
    }
  }
};
