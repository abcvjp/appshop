const testClient = require('../../testClient');
const sampleCategories = require('../../../sample-data/category.sample');
const { categoryMatcher, paginationMatcher } = require('../../matchers');
const sampleUsers = require('../../../sample-data/user.sample');
const rolesHelper = require('../../../helpers/roles.helper');
const { generateAccessTokenByUser } = require('../../../helpers/jwt.helper');

// beforeAll(async () => {
// await queryInterface.bulkDelete('Categories', null, {});
// await queryInterface.bulkInsert('Categories', sampleCategories);
// });

describe('GET /category/all', () => {
  //prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );

  test('without any param', async () => {
    await testClient
      .get(`/category/all`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toEqual(sampleCategories.length);
        expect(res.body.data).toEqual(
          expect.arrayContaining([categoryMatcher])
        );
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test('with published=true param', async () => {
    await testClient
      .get(`/category/all?published=true`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(
          expect.arrayContaining([categoryMatcher])
        );
        expect(res.body.data.every((x) => x.published === true)).toEqual(true);
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test('with published=false param', async () => {
    await testClient
      .get(`/category/all?published=false`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(
          expect.arrayContaining([categoryMatcher])
        );
        expect(res.body.data.every((x) => x.published === false)).toEqual(true);
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  describe('with sort param', () => {
    const sortElemnents = [
      { name: 'Newest', value: 'createdAt.desc' },
      { name: 'Oldest', value: 'createdAt.asc' }
    ];
    sortElemnents.forEach((sortElement) => {
      test(`with 'sort=${sortElement.value}' param`, async () => {
        await testClient
          .get(`/category/all?sort=${sortElement.value}`)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            expect(res.body).toHaveProperty('success', true);
            expect(res.body).toHaveProperty('data');
            expect(res.body.data.length).toBeGreaterThan(0);
            expect(res.body.data).toEqual(
              expect.arrayContaining([categoryMatcher])
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
});
