const { GameCategory } = require('../../models');
const sequelize = require('sequelize');
const op = sequelize.Op;

module.exports = async (req, res) => {
  const search = req.params.name || null;
  const data = await GameCategory.findAll({
    where: {
      category: {
        [op.like]: '%' + search + '%'
      }
    }
  });
  if (data) res.status(200).json(data);
  else res.status(404).json({ message: 'no data' });
};
