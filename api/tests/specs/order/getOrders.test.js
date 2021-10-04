const testClient = require('../../testClient');
const { queryInterface } = require('../../../models');
const sampleOrders = require('../../../sample-data/order.sample');
const sampleUsers = require('../../../sample-data/user.sample');
const { paginationMatcher, orderMatcher } = require('../../matchers');
const rolesHelper = require('../../../helpers/roles.helper');
const { generateAccessTokenByUser } = require('../../../helpers/jwt.helper');
const moment = require('moment');

beforeAll(async () => {
  await queryInterface.bulkDelete('Orders', null, {});
  await queryInterface.bulkInsert('Orders', sampleOrders);
});

describe('GET /order/all', () => {
  // prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );
  const sampleOrder = [Math.floor(Math.random() * sampleOrders.length)];

  test('without any query param', async () => {
    await testClient
      .get('/order/all')
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(expect.arrayContaining([orderMatcher]));
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test('with pagination param', async () => {
    await testClient
      .get('/order/all?current_page=1&page_size=5')
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([orderMatcher]));
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  describe('with sort param', () => {
    const sortElemnents = [
      { name: 'Newest', value: 'createdAt.desc' },
      { name: 'Oldest', value: 'createdAt.asc' },
      { name: 'Total (Low to High)', value: 'order_total.asc' },
      { name: 'Total (High to Low)', value: 'order_total.desc' },
      { name: 'Updated Recently', value: 'updatedAt.desc' }
    ];
    sortElemnents.forEach((sortElement) => {
      test(`with 'sort=${sortElement.value}' param`, async () => {
        await testClient
          .get(`/order/all?sort=${sortElement.value}`)
          .set('Cookie', [
            `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
          ])
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            expect(res.body).toHaveProperty('success', true);
            expect(res.body).toHaveProperty('data');
            expect(res.body.data.length).toBeGreaterThan(0);
            expect(res.body.data).toEqual(
              expect.arrayContaining([orderMatcher])
            );

            // check if is sorted
            if (sortElement.value.split('.')[1] === 'asc') {
              expect(
                !!res.body.data.reduce(
                  (n, item) => n !== false && item >= n && item
                )
              ).toEqual(true);
            } else {
              expect(
                !!res.body.data.reduce(
                  (n, item) => n !== false && item <= n && item
                )
              ).toEqual(true);
            }

            expect(res.body).toHaveProperty('pagination');
            expect(res.body.pagination).toEqual(paginationMatcher);
          });
      });
    });
  });

  test('with start_date param', async () => {
    const date = moment(sampleOrder.createdAt).format('YYYY-MM-DD');
    await testClient
      .get(`/order/all?start_date=${date}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([orderMatcher]));
        res.body.data.forEach((e) => {
          expect(moment(e.createdAt).isSameOrAfter(date));
        });
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test('with end_date param', async () => {
    const date = moment(sampleOrder.createdAt)
      .add(1, 'days')
      .format('YYYY-MM-DD');
    await testClient
      .get(`/order/all?end_date=${date}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([orderMatcher]));
        res.body.data.forEach((e) => {
          expect(moment(e.createdAt).isSameOrBefore(date));
        });
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test('with status param', async () => {
    const status = 'Pending';
    await testClient
      .get(`/order/all?status=${status}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([orderMatcher]));
        expect(res.body.data.every((e) => e.status === status)).toEqual(true);
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test('with shipping_status param', async () => {
    const shipping_status = 'Undelivered';
    await testClient
      .get(`/order/all?shipping_status=${shipping_status}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([orderMatcher]));
        expect(
          res.body.data.every((e) => e.shipping_status === shipping_status)
        ).toEqual(true);
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test('with payment_status param', async () => {
    const payment_status = 'Unpaid';
    await testClient
      .get(`/order/all?payment_status=${payment_status}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([orderMatcher]));
        expect(
          res.body.data.every((e) => e.payment_status === payment_status)
        ).toEqual(true);
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test('without access token', async () => {
    const res = await testClient
      .get('/order/all')
      .set('Accept', 'application/json')
      .expect(401)
      .expect('Content-Type', /json/);
  });

  test('with forbidden user', async () => {
    const res = await testClient
      .get('/order/all')
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleNormalUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(403)
      .expect('Content-Type', /json/);
  });
});
