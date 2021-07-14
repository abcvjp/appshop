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
     * 
    */
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Thời trang nam',
        description: 'Thời trang dành riêng cho nam giới',
        path: 'Thời trang nam',
        slug: 'thoi-trang-nam',
        meta_title: 'Thời trang nam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Thời trang nữ',
        description: 'Thời trang dành riêng cho nữ giới',
        path: 'Thời trang nữ',
        slug: 'thoi-trang-nu',
        meta_title: 'Thời trang nữ',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Áo khoác nam',
        description: 'Áo khoác dành riêng cho nam giới',
        path: 'Thời trang nam - Áo khoác nam',
        slug: 'ao-khoac-nam',
        meta_title: 'Áo khoác nam',
        parent_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Váy nữ',
        description: 'Váy dành riêng cho nữa giới',
        path: 'Thời trang nữ - Váy nữ',
        slug: 'vay-nu',
        meta_title: 'Váy nữ',
        parent_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkInsert('Categories', null, {})
  }
};
