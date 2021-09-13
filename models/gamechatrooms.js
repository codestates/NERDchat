'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameChatRooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      models.GameChatRooms.belongsTo(models.Users, { foreignKey: 'roomAdmin' });
      models.GameChatRooms.belongsTo(models.GameCategory, { foreignKey: 'gameId' });
      models.GameChatRooms.hasOne(models.Users, { foreignKey: 'currentRoom' });
      models.GameChatRooms.hasMany(models.Messages, { foreignKey: 'roomId' });
    }
  }
  GameChatRooms.init({
    roomTitle: DataTypes.STRING,
    uuid: DataTypes.STRING,
    current: DataTypes.INTEGER,
    max: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GameChatRooms'
  });
  return GameChatRooms;
};
