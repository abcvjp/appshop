const testClient = require('../../testClient');
const { queryInterface } = require('../../../models');
const sampleOrders = require('../../../sample-data/order.sample');
const sampleUsers = require('../../../sample-data/user.sample');
const rolesHelper = require('../../../helpers/roles.helper');
const { generateAccessTokenByUser } = require('../../../helpers/jwt.helper');
const { orderMatcher } = require('../../matchers');
const { uuid } = require('uuidv4');

beforeAll(async () => {
  await queryInterface.bulkDelete('Orders', null, {});
  await queryInterface.bulkInsert('Orders', sampleOrders);
});

describe('GET /order/${orderId}', () => {
  // prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );
  const id = sampleOrders[Math.floor(Math.random() * sampleOrders.length)].id;

  test('with exist order id', async () => {
    await testClient
      .get(`/order/${id}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(orderMatcher);
      });
  });

  test('with non-exist order id', async () => {
    await testClient
      .get(`/order/${uuid()}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(404)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toMatchObject({
          success: false,
          error: {
            message: 'Order does not exist'
          }
        });
      });
  });

  test('without access token', async () => {
    const res = await testClient
      .get(`/order/${id}`)
      .set('Accept', 'application/json')
      .expect(401)
      .expect('Content-Type', /json/);
  });

  test('with forbidden user', async () => {
    const res = await testClient
      .get(`/order/${id}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleNormalUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(403)
      .expect('Content-Type', /json/);
  });
});
