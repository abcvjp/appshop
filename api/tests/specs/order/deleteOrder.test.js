const testClient = require('../../testClient');
const sampleOrders = require('../../../sample-data/order.sample');
const { queryInterface } = require('../../../models');
const { Order } = require('../../../models');
const sampleUsers = require('../../../sample-data/user.sample');
const rolesHelper = require('../../../helpers/roles.helper');
const { generateAccessTokenByUser } = require('../../../helpers/jwt.helper');
const { uuid } = require('uuidv4');

beforeAll(async () => {
  await queryInterface.bulkDelete('Orders', null, {});
  await queryInterface.bulkInsert('Orders', sampleOrders);
});

afterEach(async () => {
  await queryInterface.bulkDelete('Orders', null, {});
  await queryInterface.bulkInsert('Orders', sampleOrders);
});

describe('delete /order/{orderId}', () => {
  // prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );
  const sampleOrder =
    sampleOrders[Math.floor(Math.random() * sampleOrders.length)];

  test('delete exist order', async () => {
    const res = await testClient
      .delete(`/order/${sampleOrder.id}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('success', true);
    const checkResult = await Order.findByPk(sampleOrder.id);
    expect(checkResult).toBeNull;
  });

  test('delete non-exist order', async () => {
    const res = await testClient
      .delete(`/order/${uuid()}`)
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
      .delete(`/order/${sampleOrder.id}`)
      .set('Accept', 'application/json')
      .expect(401)
      .expect('Content-Type', /json/);
  });

  test('with forbidden user', async () => {
    const res = await testClient
      .delete(`/order/${sampleOrder.id}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleNormalUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(403)
      .expect('Content-Type', /json/);
  });
});
