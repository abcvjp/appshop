const testClient = require('../../testClient');
const { queryInterface } = require('../../../models');
const sampleProducts = require('../../../sample-data/product.sample');
const sampleUsers = require('../../../sample-data/user.sample');
const { paginationMatcher, productMatcher } = require('../../matchers');
const rolesHelper = require('../../../helpers/roles.helper');
const { generateAccessTokenByUser } = require('../../../helpers/jwt.helper');

beforeAll(async () => {
  await queryInterface.bulkDelete('Products', null, {});
  await queryInterface.bulkInsert('Products', sampleProducts);
});

describe('GET /product/all', () => {
  test('without any query param', async () => {
    await testClient
      .get('/product/all')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(expect.arrayContaining([productMatcher]));
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test('with pagination param', async () => {
    await testClient
      .get('/product/all?current_page=1&page_size=5')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([productMatcher]));
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  describe('with sort param', () => {
    const sortElemnents = [
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
          .get(`/product/all?sort=${sortElement.value}`)
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

  test('with category_id param', async () => {
    const category_id = 'd08e5a2d-fba2-4d5b-90cd-8cc1cd90e989';
    await testClient
      .get(`/product/all?category_id=${category_id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([productMatcher]));
        res.body.data.forEach((e) => {
          expect(e).toHaveProperty('category');
          expect(e.category).toHaveProperty('id', category_id);
        });
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test('with category_slug param', async () => {
    const category_slug = 'thoi-trang-nam';
    await testClient
      .get(`/product/all?category_slug=${category_slug}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([productMatcher]));
        res.body.data.forEach((e) => {
          expect(e).toHaveProperty('category');
          expect(e.category).toHaveProperty('slug', category_slug);
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
        .get('/product/all?enable=true')
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
          expect(res.body).toHaveProperty('pagination');
          expect(res.body.pagination).toEqual(paginationMatcher);
          expect(
            res.body.data.every((product) => product.enable === true)
          ).toEqual(true);
        });
    });

    test('with enable=false param', async () => {
      await testClient
        .get('/product/all?enable=false')
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
          expect(res.body).toHaveProperty('pagination');
          expect(res.body.pagination).toEqual(paginationMatcher);
          expect(
            res.body.data.every((product) => product.enable === false)
          ).toEqual(true);
        });
    });

    test('with published=true param', async () => {
      await testClient
        .get('/product/all?published=true')
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
          expect(res.body).toHaveProperty('pagination');
          expect(res.body.pagination).toEqual(paginationMatcher);
          expect(
            res.body.data.every((product) => product.published === true)
          ).toEqual(true);
        });
    });

    test('with published=false param', async () => {
      await testClient
        .get('/product/all?published=false')
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
          expect(res.body).toHaveProperty('pagination');
          expect(res.body.pagination).toEqual(paginationMatcher);
          expect(
            res.body.data.every((product) => product.published === false)
          ).toEqual(true);
        });
    });

    test('with in_stock=true param', async () => {
      await testClient
        .get('/product/all?in_stock=true')
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
          expect(res.body).toHaveProperty('pagination');
          expect(res.body.pagination).toEqual(paginationMatcher);
          expect(
            res.body.data.every((product) => product.quantity > 0)
          ).toEqual(true);
        });
    });

    test('with in_stock=false param', async () => {
      await testClient
        .get('/product/all?in_stock=false')
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
          expect(res.body).toHaveProperty('pagination');
          expect(res.body.pagination).toEqual(paginationMatcher);
          expect(
            res.body.data.every((product) => product.quantity === 0)
          ).toEqual(true);
        });
    });
  });

  test(`with price param`, async () => {
    await testClient
      .get(`/product/all?price=0,10`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([productMatcher]));
        res.body.data.forEach((e) => {
          expect(e).toHaveProperty('price');
        });
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });
});
