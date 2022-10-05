'use strict';
const { DATE } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.comments.belongsTo(models.user)
      models.comments.belongsTo(models.nutrition)
    }
  }
  comments.init({
    username: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    nutritionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};