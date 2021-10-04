const testClient = require('../../testClient');
const { queryInterface } = require('../../../models');
const sampleCategories = require('../../../sample-data/category.sample');
const sampleUsers = require('../../../sample-data/user.sample');
const { paginationMatcher } = require('../../matchers');
const rolesHelper = require('../../../helpers/roles.helper');
const { generateAccessTokenByUser } = require('../../../helpers/jwt.helper');

const CategoryMatcher = expect.objectContaining({
  id: expect.any(String),
  name: expect.any(String),
  slug: expect.any(String),
  description: expect.any(String),
  relevance: expect.any(Number)
});

beforeAll(async () => {
  await queryInterface.bulkDelete('Categories', null, {});
  await queryInterface.bulkInsert('Categories', sampleCategories);
});

describe('GET /search/category', () => {
  // prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );
  const keyword = 'ao thun nam';

  test('without any param', async () => {
    await testClient
      .get(`/search/category?q=${keyword}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(
          expect.arrayContaining([CategoryMatcher])
        );
        res.body.data.forEach((e) => {
          expect(e.relevance).toBeGreaterThan(0);
        });
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test('with pagination param', async () => {
    await testClient
      .get(`/search/category?q=${keyword}&current_page=1&page_size=5`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(
          expect.arrayContaining([CategoryMatcher])
        );
        res.body.data.forEach((e) => {
          expect(e.relevance).toBeGreaterThan(0);
        });
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  describe('with sort param', () => {
    const sortElemnents = [
      { name: 'Relevance', value: 'relevance.desc' },
      { name: 'Newest', value: 'createdAt.desc' },
      { name: 'Oldest', value: 'createdAt.asc' }
    ];
    sortElemnents.forEach((sortElement) => {
      test(`with 'sort=${sortElement.value}' param`, async () => {
        await testClient
          .get(`/search/category?q=${keyword}&sort=${sortElement.value}`)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            expect(res.body).toHaveProperty('success', true);
            expect(res.body).toHaveProperty('data');
            expect(res.body.data.length).toBeGreaterThan(0);
            expect(res.body.data).toEqual(
              expect.arrayContaining([CategoryMatcher])
            );
            res.body.data.forEach((e, i) => {
              expect(e.relevance).toBeGreaterThan(0);
            });

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
  test('with published=true param', async () => {
    await testClient
      .get(`/search/category?q=${keyword}&published=true`)
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
          expect.arrayContaining([CategoryMatcher])
        );
        res.body.data.forEach((e) => {
          expect(e.relevance).toBeGreaterThan(0);
          expect(e).toHaveProperty('published', true);
        });
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
        expect(
          res.body.data.every((category) => category.published === true)
        ).toEqual(true);
      });
  });

  test('with published=false param', async () => {
    await testClient
      .get(`/search/category?q=nha%20cua%20doi%20song&published=false`)
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
          expect.arrayContaining([CategoryMatcher])
        );
        res.body.data.forEach((e) => {
          expect(e).toHaveProperty('published', false);
        });
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
        expect(
          res.body.data.every((category) => category.published === false)
        ).toEqual(true);
      });
  });
});
