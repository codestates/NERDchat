'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PrivateMessages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      models.PrivateMessages.belongsTo(models.Users, { foreignKey: 'user1id' });
      models.PrivateMessages.belongsTo(models.Users, { foreignKey: 'user2id' });
    }
  }
  PrivateMessages.init({
    user1id: DataTypes.INTEGER,
    user2id: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PrivateMessages'
  });
  return PrivateMessages;
};
