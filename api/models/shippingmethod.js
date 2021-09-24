'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShippingMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShippingMethod.hasMany(models.Order, {
        foreignKey: { name: 'shipping_method_id', allowNull: false },
        onDelete: 'RESTRICT'
      });
    }
  }

  ShippingMethod.init(
    {
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
      fee: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0
        }
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'ShippingMethod'
    }
  );
  return ShippingMethod;
};
