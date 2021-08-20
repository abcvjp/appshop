'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OrderReport.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false
    },
    orders_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    completed_orders_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    item_total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    items_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    shipping_fee: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    order_total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    expected_profit: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'OrderReport',
  });
  return OrderReport;
};