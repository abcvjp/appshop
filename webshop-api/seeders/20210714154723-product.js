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
    return queryInterface.bulkInsert('Products', [{
      name: 'ÁO KHOÁC DÙ NAM HAHAMAN',
      title: 'ÁO KHOÁC DÙ NAM HAHAMAN 2 TRONG 1 CHUYỂN ĐỔI THÀNH BALO SIÊU NHẸ',
      category_id: 1,
      price: 5,
      quantity: 100,
      short_description: 'ÁO KHOÁC DÙ NAM HAHAMAN 2 TRONG 1 CHUYỂN ĐỔI THÀNH BALO SIÊU NHẸ asdfqwerqwerqwrasfasdf',
      description: 'Áo gió được may với chất liệu vải gió lụa chống thấm nước và giữ ấm cơ thể tốt, túi có khóa kéo chắc chắn. Thích hợp mặc chống nắng, đi mưa nhỏ, du lị Áo có tích hợp balo siêu gọn nhẹ và 1 túi đựng điện thoại bên trong áo****ĐẶC BIỆT: ÁO CÓ THỂ CHUYỂN ĐỔI THÀNH BALO MANG VAI TRONG VÒNG 1 NỐT NHẠC GIÚP ĐỰNG VẬT DỤNG NHƯ SÁCH VỞ, ĐỒ TRANG SỨC, LAPTOP, IPAD , ĐIỆN THOẠI',
      images: JSON.stringify([{ url: 'https://salt.tikicdn.com/cache/w64/ts/product/7f/8d/e7/40b354cbe47cd3376f46becc600879e4.jpg' },
      { url: 'https://salt.tikicdn.com/cache/w64/ts/product/1f/55/e6/3639032b7f9a6cda399026eb33c8f89c.jpg' }]),
      slug: 'ao-khoac-du-nam-hahaman',
      meta_title: 'ÁO KHOÁC DÙ NAM HAHAMAN 2 TRONG 1 CHUYỂN ĐỔI THÀNH BALO SIÊU NHẸ',
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
    return queryInterface.bulkDelete('Products', null, {});
  }
};
