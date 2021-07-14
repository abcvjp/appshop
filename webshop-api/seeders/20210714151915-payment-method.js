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
    return queryInterface.bulkInsert('PaymentMethods', [{
      name: 'COD',
      detail: 'Thanh toán bằng tiền mặt khi nhận hàng',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Chuyển khoản ngân hàng',
      detail: 'Chuyển khoản ngân hàng tới nơi nào có em',
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
    return queryInterface.bulkDelete('PaymentMethods', null, {});
  }
};
