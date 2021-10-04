const testClient = require('../../testClient');
const { queryInterface } = require('../../../models');
const sampleUsers = require('../../../sample-data/user.sample');
const rolesHelper = require('../../../helpers/roles.helper');
const { generateAccessTokenByUser } = require('../../../helpers/jwt.helper');
const { userMatcher } = require('../../matchers');
const { uuid } = require('uuidv4');

beforeAll(async () => {
  await queryInterface.bulkDelete('Users', null, {});
  await queryInterface.bulkInsert('Users', sampleUsers);
});

describe('GET /user/${userId}', () => {
  // prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );
  const id = sampleUsers[Math.floor(Math.random() * sampleUsers.length)].id;

  test('with exist user id', async () => {
    await testClient
      .get(`/user/${id}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(userMatcher);
        expect(res.body.data).toHaveProperty('id', id);
      });
  });

  test('with non-exist user id', async () => {
    await testClient
      .get(`/user/${uuid()}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(404)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toMatchObject({
          success: false
        });
      });
  });

  // test("without access token", async () => {
  // const res = await testClient
  // .get(`/user/${id}`)
  // .set("Accept", "application/json")
  // .expect(401)
  // .expect("Content-Type", /json/);
  // });

  // test("with forbidden user", async () => {
  // const res = await testClient
  // .get(`/user/${id}`)
  // .set("Cookie", [
  // `access_token=${generateAccessTokenByUser(sampleNormalUser)}`,
  // ])
  // .set("Accept", "application/json")
  // .expect(403)
  // .expect("Content-Type", /json/);
  // });
});
