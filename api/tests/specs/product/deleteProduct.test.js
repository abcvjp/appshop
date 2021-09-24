const testClient = require('../../testClient');
const sampleProducts = require('../../../sample-data/product.sample');
const { queryInterface } = require('../../../models');
const { Product } = require('../../../models');
const sampleUsers = require('../../../sample-data/user.sample');
const rolesHelper = require('../../../helpers/roles.helper');
const { generateAccessTokenByUser } = require('../../../helpers/jwt.helper');
const { uuid } = require('uuidv4');

beforeAll(async () => {
  await queryInterface.bulkDelete('Products', null, {});
  await queryInterface.bulkInsert('Products', sampleProducts);
});

afterEach(async () => {
  await queryInterface.bulkDelete('Products', null, {});
  await queryInterface.bulkInsert('Products', sampleProducts);
});

describe('delete /product/{productId}', () => {
  // prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );
  const sampleProduct =
    sampleProducts[Math.floor(Math.random() * sampleProducts.length)];

  test('delete exist product', async () => {
    const res = await testClient
      .delete(`/product/${sampleProduct.id}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('success', true);
    const checkResult = await Product.findByPk(sampleProduct.id);
    expect(checkResult).toBeNull;
  });

  test('delete non-exist product', async () => {
    const res = await testClient
      .delete(`/product/${uuid()}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(404)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('success', false);
  });

  test('without access token', async () => {
    const res = await testClient
      .delete(`/product/${sampleProduct.id}`)
      .set('Accept', 'application/json')
      .expect(401)
      .expect('Content-Type', /json/);
  });

  test('with forbidden user', async () => {
    const res = await testClient
      .delete(`/product/${sampleProduct.id}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleNormalUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(403)
      .expect('Content-Type', /json/);
  });
});
