'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderItem.belongsTo(models.Order, {
        foreignKey: { name: 'order_id', allowNull: false },
        as: 'order'
      });
      OrderItem.belongsTo(models.Product, {
        foreignKey: { name: 'product_id', allowNull: true },
        as: 'product'
      });
    }
  }

  OrderItem.init(
    {
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 0
        }
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      product_thumbnail: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'OrderItem'
    }
  );
  return OrderItem;
};
