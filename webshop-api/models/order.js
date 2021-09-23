'use strict';
const { Model } = require('sequelize');
const createError = require('http-errors');
const { uuid } = require('uuidv4');
const moment = require('moment');
const { roundPrice } = require('../helpers/logicFunc.helper');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasMany(models.OrderItem, {
        as: 'order_items',
        foreignKey: { name: 'order_id', allowNull: false }
      });
      Order.belongsTo(models.PaymentMethod, {
        as: 'payment_method',
        foreignKey: { name: 'payment_method_id', allowNull: false }
      });
      Order.belongsTo(models.ShippingMethod, {
        as: 'shipping_method',
        foreignKey: { name: 'shipping_method_id', allowNull: false }
      });
    }
  }

  Order.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Handling', 'Completed', 'Canceled'),
        allowNull: false,
        defaultValue: 'Pending'
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
        defaultValue: 'Unpaid'
      },
      shipping_status: {
        type: DataTypes.ENUM(
          'Undelivered',
          'Delivering',
          'Successfully delivered',
          'Delivery failed'
        ),
        allowNull: false,
        defaultValue: 'Undelivered'
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
    },
    {
      sequelize,
      modelName: 'Order',
      hooks: {
        afterCreate: async (order, options) => {
          try {
            const OrderReport = sequelize.models.OrderReport;
            const orderReport = await OrderReport.findOne({
              where: {
                day: moment(order.createdAt).format('YYYY-MM-DD')
              }
            });
            if (orderReport) {
              const {
                orders_number,
                order_total,
                item_total,
                items_number,
                shipping_fee,
                expected_profit
              } = orderReport;
              return orderReport.update(
                {
                  orders_number: orders_number + 1,
                  item_total: roundPrice(item_total + order.item_total),
                  items_number: items_number + options.items_number,
                  shipping_fee: roundPrice(shipping_fee + order.shipping_fee),
                  order_total: roundPrice(order_total + order.order_total),
                  expected_profit: roundPrice(expected_profit + options.profit)
                },
                {
                  transaction: options.transaction
                }
              );
            } else {
              return OrderReport.create(
                {
                  id: uuid(),
                  day: moment(order.createdAt).format('YYYY-MM-DD'),
                  orders_number: 1,
                  item_total: order.item_total,
                  items_number: options.items_number,
                  shipping_fee: order.shipping_fee,
                  order_total: order.order_total,
                  expected_profit: options.profit
                },
                {
                  transaction: options.transaction
                }
              );
            }
          } catch (error) {
            throw createError(500, 'Error while updating report');
          }
        },
        afterUpdate: async (order, options) => {
          if (order.status === 'Completed') {
            try {
              const OrderReport = sequelize.models.OrderReport;
              const orderReport = await OrderReport.findOne({
                where: {
                  day: moment(order.createdAt).format('YYYY-MM-DD')
                }
              });
              if (orderReport) {
                return orderReport.increment(
                  'completed_orders_number',
                  {
                    by: 1
                  },
                  {
                    transaction: options.transaction
                  }
                );
              }
            } catch (error) {
              throw createError(500, 'Error while updating report');
            }
          }
        }
      }
    }
  );
  return Order;
};
