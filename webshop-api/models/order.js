'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasMany(models.OrderItem, { as: 'order_items', foreignKey: { name: 'order_id', allowNull: false } })
      Order.belongsTo(models.PaymentMethod, { as: 'payment_method', foreignKey: { name: 'payment_method_id', allowNull: false } })
      Order.belongsTo(models.ShippingMethod, { as: 'shipping_method', foreignKey: { name: 'shipping_method_id', allowNull: false } })
    }
  };
  Order.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Handling', 'Completed', 'Canceled'),
      allowNull: false,
      defaultValue: "Pending"
    },
    order_total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    item_total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    shipping_fee: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    payment_status: {
      type: DataTypes.ENUM('Unpaid', 'Paid'),
      allowNull: false,
      defaultValue: "Unpaid"
    },
    shipping_status: {
      type: DataTypes.ENUM('Undelivered', 'Delivering', 'Successfully delivered', 'Delivery failed'),
      allowNull: false,
      defaultValue: "Undelivered"
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shipping_note: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};