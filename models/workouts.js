'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workouts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.workouts.belongsTo(models.user)
    }
  }
  workouts.init({
    userId: DataTypes.STRING,
    bodyPart: DataTypes.STRING,
    equipment: DataTypes.STRING,
    gifURL: DataTypes.STRING,
    name: DataTypes.STRING,
    target: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'workouts',
  });
  return workouts;
};