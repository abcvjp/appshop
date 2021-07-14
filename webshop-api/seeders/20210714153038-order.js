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
    return queryInterface.bulkInsert('Orders', [{
      cost: 10,
      customer_name: 'Hoai dep trai',
      address: '85 Xuan Thuy, Dich Vong Hau, Cau Giay, Ha Noi',
      email: 'example@example.com',
      phone_number: '0364120570',
      shipping_note: 'Giao hang xong nho khen hoai dep trai',
      payment_method_id: 1,
      shipping_method_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Orders', null, {});
  }
};