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
      Order.hasMany(models.OrderItem, { foreignKey: { name: 'order_id', allowNull: false } })
      Order.belongsTo(models.PaymentMethod, { foreignKey: { name: 'payment_method_id', allowNull: false } })
      Order.belongsTo(models.ShippingMethod, { foreignKey: { name: 'shipping_method_id', allowNull: false } })
    }
  };
  Order.init({
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Chờ xác nhận"
    },
    cost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Chưa thanh toán"
    },
    shipping_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Chưa vận chuyển"
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