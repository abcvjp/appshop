const testClient = require('../../testClient');
const { queryInterface } = require('../../../models');
const sampleProducts = require('../../../sample-data/product.sample');
const sampleUsers = require('../../../sample-data/user.sample');
const { paginationMatcher } = require('../../matchers');
const rolesHelper = require('../../../helpers/roles.helper');
const { generateAccessTokenByUser } = require('../../../helpers/jwt.helper');

const productMatcher = expect.objectContaining({
  id: expect.any(String),
  name: expect.any(String),
  slug: expect.any(String),
  price: expect.any(Number),
  category: expect.any(Object),
  relevance: expect.any(Number)
});

beforeAll(async () => {
  await queryInterface.bulkDelete('Products', null, {});
  await queryInterface.bulkInsert('Products', sampleProducts);
});

// prepare data
const keyword = 'ao linh my';

describe('GET /search', () => {
  test('without any filter param', async () => {
    await testClient
      .get(`/search?q=${keyword}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(expect.arrayContaining([productMatcher]));
        res.body.data.forEach((e) => {
          expect(e).toHaveProperty('relevance');
          expect(e.relevance).toBeGreaterThan(0);
        });
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test('with pagination param', async () => {
    await testClient
      .get(`/search?q=${keyword}&current_page=1&page_size=5`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([productMatcher]));
        res.body.data.forEach((e) => {
          expect(e).toHaveProperty('relevance');
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
      { name: 'Oldest', value: 'createdAt.asc' },
      { name: 'Price (Low to High)', value: 'price.asc' },
      { name: 'Price (High to Low)', value: 'price.desc' },
      { name: 'Discount', value: 'discount.desc' },
      { name: 'Best Selling', value: 'sold.desc' }
    ];
    sortElemnents.forEach((sortElement) => {
      test(`with 'sort=${sortElement.value}' param`, async () => {
        await testClient
          .get(`/search?q=${keyword}&sort=${sortElement.value}`)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            expect(res.body).toHaveProperty('success', true);
            expect(res.body).toHaveProperty('data');
            expect(res.body.data.length).toBeGreaterThan(0);
            expect(res.body.data).toEqual(
              expect.arrayContaining([productMatcher])
            );
            res.body.data.forEach((e, i) => {
              expect(e).toHaveProperty('relevance');
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

  test('with category id param', async () => {
    const category_id = 'd08e5a2d-fba2-4d5b-90cd-8cc1cd90e989';
    await testClient
      .get(`/search?q=${keyword}&category_id=${category_id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([productMatcher]));
        res.body.data.forEach((e) => {
          expect(e).toHaveProperty('relevance');
          expect(e.relevance).toBeGreaterThan(0);
          expect(e.category).toHaveProperty('id', category_id);
        });
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  describe('with enable/published/in_stock param', () => {
    const sampleAdminUser = sampleUsers.find(
      (user) => user.role === rolesHelper.Admin
    );
    const sampleAccessToken = generateAccessTokenByUser(sampleAdminUser);

    test('with enable=true param', async () => {
      await testClient
        .get(`/search?q=${keyword}&enable=true`)
        .set('Cookie', [`access_token=${sampleAccessToken}`])
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data.length).toBeGreaterThan(0);
          expect(res.body.data).toEqual(
            expect.arrayContaining([productMatcher])
          );
          res.body.data.forEach((e) => {
            expect(e).toHaveProperty('relevance');
            expect(e.relevance).toBeGreaterThan(0);
            expect(e).toHaveProperty('enable', true);
          });
          expect(res.body).toHaveProperty('pagination');
          expect(res.body.pagination).toEqual(paginationMatcher);
        });
    });

    test('with enable=false param', async () => {
      await testClient
        .get(`/search?q=${keyword}&enable=false`)
        .set('Cookie', [`access_token=${sampleAccessToken}`])
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data.length).toBeGreaterThan(0);
          expect(res.body.data).toEqual(
            expect.arrayContaining([productMatcher])
          );
          res.body.data.forEach((e) => {
            expect(e).toHaveProperty('relevance');
            expect(e.relevance).toBeGreaterThan(0);
            expect(e).toHaveProperty('enable', false);
          });
          expect(res.body).toHaveProperty('pagination');
          expect(res.body.pagination).toEqual(paginationMatcher);
          expect(
            res.body.data.every((product) => product.enable === false)
          ).toEqual(true);
        });
    });

    test('with published=true param', async () => {
      await testClient
        .get(`/search?q=${keyword}&published=true`)
        .set('Cookie', [`access_token=${sampleAccessToken}`])
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data.length).toBeGreaterThan(0);
          expect(res.body.data).toEqual(
            expect.arrayContaining([productMatcher])
          );
          res.body.data.forEach((e) => {
            expect(e).toHaveProperty('relevance');
            expect(e.relevance).toBeGreaterThan(0);
            expect(e).toHaveProperty('published', true);
          });
          expect(res.body).toHaveProperty('pagination');
          expect(res.body.pagination).toEqual(paginationMatcher);
          expect(
            res.body.data.every((product) => product.published === true)
          ).toEqual(true);
        });
    });

    test('with published=false param', async () => {
      await testClient
        .get(`/search?q=${keyword}&published=false`)
        .set('Cookie', [`access_token=${sampleAccessToken}`])
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data.length).toBeGreaterThan(0);
          expect(res.body.data).toEqual(
            expect.arrayContaining([productMatcher])
          );
          res.body.data.forEach((e) => {
            expect(e).toHaveProperty('relevance');
            expect(e.relevance).toBeGreaterThan(0);
            expect(e).toHaveProperty('published', false);
          });
          expect(res.body).toHaveProperty('pagination');
          expect(res.body.pagination).toEqual(paginationMatcher);
          expect(
            res.body.data.every((product) => product.published === false)
          ).toEqual(true);
        });
    });

    test('with in_stock=true param', async () => {
      await testClient
        .get(`/search?q=${keyword}&in_stock=true`)
        .set('Cookie', [`access_token=${sampleAccessToken}`])
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data.length).toBeGreaterThan(0);
          expect(res.body.data).toEqual(
            expect.arrayContaining([productMatcher])
          );
          res.body.data.forEach((e) => {
            expect(e).toHaveProperty('relevance');
            expect(e.relevance).toBeGreaterThan(0);
            expect(e.quantity).toBeGreaterThan(0);
          });
          expect(res.body).toHaveProperty('pagination');
          expect(res.body.pagination).toEqual(paginationMatcher);
        });
    });

    test('with in_stock=false param', async () => {
      await testClient
        .get(`/search?q=${keyword}&in_stock=false`)
        .set('Cookie', [`access_token=${sampleAccessToken}`])
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('data');
          expect(res.body.data.length).toBeGreaterThan(0);
          expect(res.body.data).toEqual(
            expect.arrayContaining([productMatcher])
          );
          res.body.data.forEach((e) => {
            expect(e).toHaveProperty('relevance');
            expect(e.relevance).toBeGreaterThan(0);
            expect(e.quantity).toEqual(0);
          });
          expect(res.body).toHaveProperty('pagination');
          expect(res.body.pagination).toEqual(paginationMatcher);
        });
    });
  });

  test(`with price param`, async () => {
    await testClient
      .get(`/search?q=${keyword}&price=0,10`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([productMatcher]));
        res.body.data.forEach((e) => {
          expect(e).toHaveProperty('relevance');
          expect(e.relevance).toBeGreaterThan(0);
          expect(e).toHaveProperty('price');
        });
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });
});
