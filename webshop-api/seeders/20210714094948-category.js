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
        id: 'd08e5a2d-fba2-4d5b-90cd-8cc1cd90e989',
        name: 'Thời trang nam',
        description: 'Thời trang dành riêng cho nam giới',
        path: 'Thời trang nam',
        slug: 'thoi-trang-nam',
        meta_title: 'Thời trang nam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '47a7e2d8-a1bb-4efd-a532-7b4a7dc2cde3',
        name: 'Thời trang nữ',
        description: 'Thời trang dành riêng cho nữ giới',
        path: 'Thời trang nữ',
        slug: 'thoi-trang-nu',
        meta_title: 'Thời trang nữ',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'd278a1cb-d2e9-47a0-afd2-36925ca84e60',
        name: 'Áo khoác nam',
        description: 'Áo khoác dành riêng cho nam giới',
        path: 'Thời trang nam - Áo khoác nam',
        slug: 'ao-khoac-nam',
        meta_title: 'Áo khoác nam',
        parent_id: 'd08e5a2d-fba2-4d5b-90cd-8cc1cd90e989',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'cf24f9e7-aaa1-464f-8ceb-519ec05e0ed0',
        name: 'Váy nữ',
        description: 'Váy dành riêng cho nữa giới',
        path: 'Thời trang nữ - Váy nữ',
        slug: 'vay-nu',
        meta_title: 'Váy nữ',
        parent_id: '47a7e2d8-a1bb-4efd-a532-7b4a7dc2cde3',
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
