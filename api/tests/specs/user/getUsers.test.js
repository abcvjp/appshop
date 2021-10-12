const testClient = require('../../testClient');
const { userMatcher, paginationMatcher } = require('../../matchers');
const sampleUsers = require('../../../sample-data/user.sample');
const rolesHelper = require('../../../helpers/roles.helper');
const { generateAccessTokenByUser } = require('../../../helpers/jwt.helper');

// beforeAll(async () => {
// await queryInterface.bulkDelete('Users', null, {});
// await queryInterface.bulkInsert('Users', sampleUsers);
// });

describe('GET /user/all', () => {
  //prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );

  test('without any param', async () => {
    await testClient
      .get(`/user/all`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toEqual(sampleUsers.length);
        expect(res.body.data).toEqual(expect.arrayContaining([userMatcher]));
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test('with enable=true param', async () => {
    await testClient
      .get(`/user/all?enable=true`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(expect.arrayContaining([userMatcher]));
        expect(res.body.data.every((x) => x.enable === true)).toEqual(true);
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test('with enable=false param', async () => {
    await testClient
      .get(`/user/all?enable=false`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(expect.arrayContaining([userMatcher]));
        expect(res.body.data.every((x) => x.enable === false)).toEqual(true);
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  describe('with sort param', () => {
    const sortElemnents = [
      { name: 'Newest', value: 'createdAt.desc' },
      { name: 'Oldest', value: 'createdAt.asc' },
      { name: 'Last Modified', value: 'updatedAt.desc' }
    ];
    sortElemnents.forEach((sortElement) => {
      test(`with 'sort=${sortElement.value}' param`, async () => {
        await testClient
          .get(`/user/all?sort=${sortElement.value}`)
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
              expect.arrayContaining([userMatcher])
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
