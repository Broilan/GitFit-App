'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nutrition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
          models.nutrition.belongsTo(models.user)
          models.nutrition.hasMany(models.comment)
    }
  }
  nutrition.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    calories: DataTypes.DECIMAL,
    fats: DataTypes.DECIMAL,
    carbs: DataTypes.DECIMAL,
    protein: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'nutrition',
  });
  return nutrition;
};