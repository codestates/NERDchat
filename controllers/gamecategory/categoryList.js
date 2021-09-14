const { GameCategory, Favorites } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');

module.exports = async (req, res) => {
  const page = req.params.page || 1;
  const offset = 5 * (page - 1);
  const userData = req.headers.authorization ? verifyAccess(req.headers.authorization.split(' ')[1]) : null;
  try {
    let userFavCategoryList;
    const usersFavList = [];
    const favCategoryList = await GameCategory.findAll({ offset, limit: 5 });
    if (userData) {
      userFavCategoryList = await Favorites.findAll({ where: { userId: userData.id }, attributes: ['gameId'] });
      userFavCategoryList.forEach((el) => usersFavList.push(el.gameId));
    }
    if (favCategoryList) {
      const payload = [];
      favCategoryList.map((list) => {
        const append = {
          id: list.id,
          image: list.image,
          category: list.category
        };
        if (usersFavList.includes(list.id)) {
          append.fav = true;
        } else append.fav = false;
        payload.push(append);
      });
      res.status(302).json({ data: payload });
    } else res.status(404).json({ message: 'no data' });
  } catch (err) {
    console.log(err);
  }
};
