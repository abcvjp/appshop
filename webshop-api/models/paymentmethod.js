'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PaymentMethod.hasMany(models.Order, {
        foreignKey: { name: 'payment_method_id', allowNull: false },
        onDelete: 'RESTRICT'
      })
    }
  };
  PaymentMethod.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'PaymentMethod',
  });
  return PaymentMethod;
};