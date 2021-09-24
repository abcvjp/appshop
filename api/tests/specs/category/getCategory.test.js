const testClient = require('../../testClient');
const { queryInterface } = require('../../../models');
const { categoryMatcher } = require('../../matchers');
const sampleCategories = require('../../../sample-data/category.sample');
const { uuid } = require('uuidv4');

beforeAll(async () => {
  await queryInterface.bulkDelete('Categories', null, {});
  await queryInterface.bulkInsert('Categories', sampleCategories);
});

describe('GET /category', () => {
  describe('GET /category?id={categoryId}', () => {
    test('with exist id', async () => {
      const id =
        sampleCategories[Math.floor(Math.random() * sampleCategories.length)]
          .id;
      await testClient
        .get(`/category/?id=${id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toEqual(categoryMatcher);
        });
    });

    test('with non-exist id', async () => {
      const id = uuid();
      await testClient
        .get(`/category?id=${id}`)
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).toMatchObject({
            success: false
          });
        });
    });
  });

  describe('GET /category?slug={categorySlug}', () => {
    test('with exist slug', async () => {
      const slug =
        sampleCategories[Math.floor(Math.random() * sampleCategories.length)]
          .slug;
      await testClient
        .get(`/category?slug=${slug}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toEqual(categoryMatcher);
        });
    });

    test('with non-exist slug', async () => {
      const slug = 'non-exist-slug';
      await testClient
        .get(`/category?slug=${slug}`)
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).toMatchObject({
            success: false
          });
        });
    });
  });
});
