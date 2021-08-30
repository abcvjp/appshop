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
        published: true,
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
        published: true,
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
        published: true,
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
        published: true,
        path: 'Thời trang nữ - Váy nữ',
        slug: 'vay-nu',
        meta_title: 'Váy nữ',
        parent_id: '47a7e2d8-a1bb-4efd-a532-7b4a7dc2cde3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'd649137e-2e01-45cf-8ef7-50b737fd8548',
        name: 'Áo khoác sơ mi nam',
        description: 'Áo khoác sơ mi nam sieu cap vjp pro',
        published: true,
        path: 'Thời trang nam - Áo khoác nam - Áo khoác sơ mi nam',
        slug: 'ao-khoac-so-mi-nam',
        meta_title: 'Áo khoác sơ mi nam',
        parent_id: 'd278a1cb-d2e9-47a0-afd2-36925ca84e60',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "d4bcb431-7389-40cd-869e-087cebac5595",
        name: "Nhà Cửa - Đời Sống",
        published: true,
        description: "Nhà Cửa - Đời Sốnggggggggg",
        path: "Nhà Cửa - Đời Sống",
        slug: "nha-cua-doi-song",
        meta_title: "Nhà Cửa - Đời Sống",
        meta_description: null,
        meta_keywords: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        parent_id: null
      },
      {
        id: "4ddb6d1c-b4e3-4924-b7e1-a59d18d12eaa",
        name: "Laptop - Máy Vi Tính",
        published: true,
        description: "Laptop - Máy Vi Tínhhhhhh",
        path: "Laptop - Máy Vi Tính",
        slug: "laptop-may-vi-tinh",
        meta_title: "Laptop - Máy Vi Tính",
        meta_description: null,
        meta_keywords: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        parent_id: null
      },
      {
        id: "b8aeecf3-c6d1-43d7-bee7-a17cfe240140",
        name: "Thiết Bị Số - Phụ Kiện Số",
        published: true,
        description: "Thiết Bị Số - Phụ Kiện Số",
        path: "Thiết Bị Số - Phụ Kiện Số",
        slug: "thiet-bi-so-phu-kien-so",
        meta_title: "Thiết Bị Số - Phụ Kiện Số",
        meta_description: null,
        meta_keywords: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        parent_id: null
      },
      {
        id: "463db887-e64c-4062-be1a-a24109d2cb4a",
        name: "Áo thun nam",
        published: true,
        description: "Áo thun nammmmmmmmmmm",
        path: "Thời trang nam - Áo thun nam",
        slug: "ao-thun-nam",
        meta_title: "Áo thun nam",
        meta_description: null,
        meta_keywords: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        parent_id: "d08e5a2d-fba2-4d5b-90cd-8cc1cd90e989"
      },
      {
        id: "dcd05ce9-b72f-4d70-bae3-9fc1c2a75ae3",
        name: "Áo thun nam ngắn tay không cổ",
        published: true,
        description: "Áo thun nam ngắn tay không cổ",
        path: "Thời trang nam - Áo thun nam - Áo thun nam ngắn tay không cổ",
        slug: "ao-thun-nam-ngan-tay-khong-co",
        meta_title: "Áo thun nam ngắn tay không cổ",
        meta_description: null,
        meta_keywords: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        parent_id: "463db887-e64c-4062-be1a-a24109d2cb4a"
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
