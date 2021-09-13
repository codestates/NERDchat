'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      models.Users.hasMany(models.GameChatRooms, { foreignKey: 'roomAdmin' });
      models.Users.belongsTo(models.GameChatRooms, { foreignKey: 'currentRoom' });
      models.Users.hasMany(models.Friends, { foreignKey: 'user1id' });
      models.Users.hasMany(models.Friends, { foreignKey: 'user2id' });
      models.Users.hasMany(models.Favorites, { foreignKey: 'userId' });
      models.Users.hasMany(models.Messages, { foreignKey: 'userId' });
      models.Users.hasOne(models.PrivateMessages, { foreignKey: 'user1id' });
      models.Users.hasOne(models.PrivateMessages, { foreignKey: 'user2id' });
    }
  }
  Users.init({
    userId: DataTypes.STRING,
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
    valid: DataTypes.BOOLEAN,
    oauth: DataTypes.STRING,
    status: DataTypes.STRING,
    currentRoom: DataTypes.STRING,
    superuser: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Users'
  });
  return Users;
};
