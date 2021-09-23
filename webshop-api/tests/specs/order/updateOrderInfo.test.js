const testClient = require('../../testClient');
const { orderMatcher } = require('../../matchers');
const sampleOrders = require('../../../sample-data/order.sample');
const { queryInterface } = require('../../../models');
const sampleUsers = require('../../../sample-data/user.sample');
const rolesHelper = require('../../../helpers/roles.helper');
const { Order } = require('../../../models');
const { generateAccessTokenByUser } = require('../../../helpers/jwt.helper');

beforeAll(async () => {
  await queryInterface.bulkDelete('Orders', null, {});
  await queryInterface.bulkInsert('Orders', sampleOrders);
});

afterEach(async () => {
  await queryInterface.bulkDelete('Orders', null, {});
  await queryInterface.bulkInsert('Orders', sampleOrders);
});

describe('put /order/{orderId}', () => {
  // prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );
  const sampleOrder =
    sampleOrders[Math.floor(Math.random() * sampleOrders.length)];
  const { customer_name, address, email, phone_number, shipping_note } =
    sampleOrder;
  const oldData = {
    customer_name,
    address,
    email,
    phone_number,
    shipping_note
  };
  const newData = {
    customer_name: customer_name + 'changed',
    address: address + 'changed',
    email: 'changed' + email,
    phone_number: (
      Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000
    ) // random 10 digit number
      .toString(),
    shipping_note: shipping_note + 'changed'
  };

  test('with all property change', async () => {
    const res = await testClient
      .put(`/order/${sampleOrder.id}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .send(newData)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toEqual(orderMatcher);
    expect(res.body.result).not.toMatchObject(oldData);

    const orderFromDb = await Order.findByPk(sampleOrder.id);
    expect(orderFromDb).not.toMatchObject(oldData);
  });

  test('without any change', async () => {
    const res = await testClient
      .put(`/order/${sampleOrder.id}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .send(oldData)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toEqual(orderMatcher);
    expect(res.body.result).toMatchObject(oldData);

    const orderFromDb = await Order.findByPk(sampleOrder.id);
    expect(orderFromDb).toMatchObject(oldData);
  });

  test('without access token', async () => {
    const res = await testClient
      .put(`/order/${sampleOrder.id}`)
      .set('Accept', 'application/json')
      .send(newData)
      .expect(401)
      .expect('Content-Type', /json/);
  });

  test('with forbidden user', async () => {
    const res = await testClient
      .put(`/order/${sampleOrder.id}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleNormalUser)}`
      ])
      .set('Accept', 'application/json')
      .send(newData)
      .expect(403)
      .expect('Content-Type', /json/);
  });
});
