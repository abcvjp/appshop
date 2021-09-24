const testClient = require('../../testClient');
const { productMatcher } = require('../../matchers');
const sampleProducts = require('../../../sample-data/product.sample');
const { queryInterface } = require('../../../models');
const sampleUsers = require('../../../sample-data/user.sample');
const rolesHelper = require('../../../helpers/roles.helper');
const { generateAccessTokenByUser } = require('../../../helpers/jwt.helper');

beforeAll(async () => {
  await queryInterface.bulkDelete('Products', null, {});
  await queryInterface.bulkInsert('Products', sampleProducts);
});

afterEach(async () => {
  await queryInterface.bulkDelete('Products', null, {});
  await queryInterface.bulkInsert('Products', sampleProducts);
});

describe('post /product', () => {
  //prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );
  const sampleAccessToken = generateAccessTokenByUser(sampleAdminUser);
  const sampleData = {
    category_id: 'd649137e-2e01-45cf-8ef7-50b737fd8548',
    description:
      '<p style="text-align:start;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Tên sản phẩm: Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn- HÀNG CHÍNH HÃNG</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Chất liệu: Kaki cao cấp</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Màu sắc: 2 Màu (Đen và xanh rêu)</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Size: S – M – L – XL – 2XL</span></p>\n<p style="text-align:left;"><span style="color: rgb(23,43,77);background-color: rgb(255,255,255);font-size: medium;font-family: Times New Roman;">+ Áo Lính dạng hộp độc đáo, phong cách lính khỏe khoắn, mạnh mẽ.</span></p>\n',
    enable: true,
    meta_description:
      'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn - HÀNG CHÍNH HÃNG',
    meta_keywords: 'ao so mi, ao linh my',
    meta_title:
      'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp test',
    name: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6 test',
    price: 10,
    published: true,
    quantity: 30,
    root_price: 15,
    short_description:
      'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn - HÀNG CHÍNH HÃNG',
    title:
      'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY, Chất Liệu Vải Kaki Cao Cấp Thiết Kế Túi Hộp Phong Cách Loại Xịn test',
    images: [
      {
        url: 'https://salt.tikicdn.com/ts/product/f2/07/0c/f82510bad668f00d4f057a70a9c72802.jpg',
        alt: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6',
        title: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6'
      },
      {
        url: 'https://salt.tikicdn.com/ts/product/53/bd/48/fd85de4aaa30597279083e2b6203f924.jpg',
        alt: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6',
        title: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6'
      },
      {
        url: 'https://salt.tikicdn.com/ts/product/f0/f9/63/6f987aed1912faf0248639e533616f50.jpg',
        alt: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6',
        title: 'Áo Sơ Mi Dài Tay Lính Mỹ U458 US ARMY 6'
      }
    ]
  };

  test('with valid request', async () => {
    const res = await testClient
      .post('/product')
      .set('Cookie', [`access_token=${sampleAccessToken}`])
      .set('Accept', 'application/json')
      .send(sampleData)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toEqual(productMatcher);

    // await Product.destroy({
    // where: {
    // id: res.body.result.id,
    // },
    // });
  });

  test('with duplicated name', async () => {
    const duplicatedName = sampleProducts[0].name;
    const res = await testClient
      .post('/product')
      .set('Cookie', [`access_token=${sampleAccessToken}`])
      .set('Accept', 'application/json')
      .send({ ...sampleData, name: duplicatedName })
      .expect(500)
      .expect('Content-Type', /json/);
    expect(res.body).toEqual(
      expect.objectContaining({
        success: false
      })
    );
  });

  test('without access token', async () => {
    const res = await testClient
      .post('/product')
      .set('Accept', 'application/json')
      .send(sampleData)
      .expect(401)
      .expect('Content-Type', /json/);
  });

  test('with forbidden user', async () => {
    const res = await testClient
      .post('/product')
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleNormalUser)}`
      ])
      .set('Accept', 'application/json')
      .send(sampleData)
      .expect(403)
      .expect('Content-Type', /json/);
  });
});
