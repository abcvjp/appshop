const testClient = require('../../testClient');
const { queryInterface } = require('../../../models');
const { productMatcher } = require('../../matchers');
const sampleProducts = require('../../../sample-data/product.sample');
const { uuid } = require('uuidv4');

beforeAll(async () => {
  await queryInterface.bulkDelete('Products', null, {});
  await queryInterface.bulkInsert('Products', sampleProducts);
});

describe('GET /product', () => {
  describe('GET /product?id={productId}', () => {
    test('with exist id', async () => {
      const id =
        sampleProducts[Math.floor(Math.random() * sampleProducts.length)].id;
      await testClient
        .get(`/product/?id=${id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toEqual(productMatcher);
        });
    });

    test('get product with non-exist id', async () => {
      const id = uuid();
      await testClient
        .get(`/product/?id=${id}`)
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

  describe('GET /product?slug={productSlug}', () => {
    test('with exist slug', async () => {
      const slug =
        sampleProducts[Math.floor(Math.random() * sampleProducts.length)].slug;
      await testClient
        .get(`/product?slug=${slug}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toEqual(productMatcher);
        });
    });

    test('with non-exist slug', async () => {
      const slug = 'non-exist-slug';
      await testClient
        .get(`/product?slug=${slug}`)
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
});
