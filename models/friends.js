'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      models.Friends.belongsTo(models.Users, { foreignKey: 'user1id' });
      models.Friends.belongsTo(models.Users, { foreignKey: 'user2id' });
    }
  }
  Friends.init({
    isValid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Friends'
  });
  return Friends;
};
