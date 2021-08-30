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
    return queryInterface.bulkInsert('OrderItems', [{
      price: 5,
      quantity: 2,
      order_id: '9e648f69-8381-4f67-b7d7-4743a78f7f34',
      product_id: '08452667-319d-4f19-abfe-9db953a18587',
      product_name: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY',
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
    return queryInterface.bulkDelete('OrderItems', null, {});
  }
};
