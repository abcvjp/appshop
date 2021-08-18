'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderReports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      order_number: {
        type: Sequelize.INTEGER
      },
      item_total: {
        type: Sequelize.DOUBLE
      },
      item_quantity: {
        type: Sequelize.INTEGER
      },
      shipping_fee: {
        type: Sequelize.DOUBLE
      },
      order_total: {
        type: Sequelize.DOUBLE
      },
      profit: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrderReports');
  }
};