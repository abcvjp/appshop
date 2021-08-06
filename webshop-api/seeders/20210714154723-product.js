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
      id: '08452667-319d-4f19-abfe-9db953a18587',
      name: 'ÁO KHOÁC DÙ NAM HAHAMAN',
      title: 'ÁO KHOÁC DÙ NAM HAHAMAN 2 TRONG 1 CHUYỂN ĐỔI THÀNH BALO SIÊU NHẸ',
      category_id: 'd08e5a2d-fba2-4d5b-90cd-8cc1cd90e989',
      price: 5,
      root_price: 8,
      quantity: 100,
      short_description: 'ÁO KHOÁC DÙ NAM HAHAMAN 2 TRONG 1 CHUYỂN ĐỔI THÀNH BALO SIÊU NHẸ asdfqwerqwerqwrasfasdf',
      description: 'Áo gió được may với chất liệu vải gió lụa chống thấm nước và giữ ấm cơ thể tốt, túi có khóa kéo chắc chắn. Thích hợp mặc chống nắng, đi mưa nhỏ, du lị Áo có tích hợp balo siêu gọn nhẹ và 1 túi đựng điện thoại bên trong áo****ĐẶC BIỆT: ÁO CÓ THỂ CHUYỂN ĐỔI THÀNH BALO MANG VAI TRONG VÒNG 1 NỐT NHẠC GIÚP ĐỰNG VẬT DỤNG NHƯ SÁCH VỞ, ĐỒ TRANG SỨC, LAPTOP, IPAD , ĐIỆN THOẠI',
      images: JSON.stringify(['https://salt.tikicdn.com/cache/w444/ts/product/56/dd/e2/2612def5999d6417d9916a828cf054df.jpg']),
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
