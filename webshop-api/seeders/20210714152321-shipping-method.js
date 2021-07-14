'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('ShippingMethods', [{
      name: 'Nhận tại cửa hàng',
      detail: 'Nhận sản phẩm tại cửa hàng',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Giao hàng tận nơi',
      detail: 'Giao hàng đến tận nơi',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('ShippingMethods', null, {});
  }
};

