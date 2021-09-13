'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      models.GameCategory.hasMany(models.GameChatRooms, { foreignKey: 'gameId' });
      models.GameCategory.hasMany(models.Favorites, { foreignKey: 'gameId' });
    }
  }
  GameCategory.init({
    image: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GameCategory'
  });
  return GameCategory;
};
