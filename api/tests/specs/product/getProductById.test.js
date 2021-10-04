const testClient = require('../../testClient');
const { queryInterface } = require('../../../models');
const sampleProducts = require('../../../sample-data/product.sample');
const { productMatcher } = require('../../matchers');
const { uuid } = require('uuidv4');

beforeAll(async () => {
  await queryInterface.bulkDelete('Products', null, {});
  await queryInterface.bulkInsert('Products', sampleProducts);
});

describe('GET /product/${productId}', () => {
  test('with exist product id', async () => {
    const id =
      sampleProducts[Math.floor(Math.random() * sampleProducts.length)].id;
    await testClient
      .get(`/product/${id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(productMatcher);
        expect(res.body.data).toHaveProperty('id', id);
      });
  });

  test('with non-exist product id', async () => {
    await testClient
      .get(`/product/${uuid()}`)
      .set('Accept', 'application/json')
      .expect(404)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toMatchObject({
          success: false,
          error: {
            message: 'Product does not exist'
          }
        });
      });
  });
});
