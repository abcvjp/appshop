const testClient = require('../../testClient');
const sampleUsers = require('../../../sample-data/user.sample');
const { queryInterface } = require('../../../models');
const { User } = require('../../../models');
const rolesHelper = require('../../../helpers/roles.helper');
const { generateAccessTokenByUser } = require('../../../helpers/jwt.helper');
const { uuid } = require('uuidv4');

beforeAll(async () => {
  await queryInterface.bulkDelete('Users', null, {});
  await queryInterface.bulkInsert('Users', sampleUsers);
});

describe('delete /user/{userId}', () => {
  // prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );
  const sampleUser =
    sampleUsers[Math.floor(Math.random() * sampleUsers.length)];

  afterEach(async () => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkInsert('Users', sampleUsers);
  });

  test('delete exist user', async () => {
    const res = await testClient
      .delete(`/user/${sampleUser.id}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('success', true);
    const checkResult = await User.findByPk(sampleUser.id);
    expect(checkResult).toBeNull;
  });

  test('delete non-exist user', async () => {
    const res = await testClient
      .delete(`/user/${uuid()}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(404)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('success', false);
  });

  test('without access token', async () => {
    const res = await testClient
      .delete(`/user/${sampleUser.id}`)
      .set('Accept', 'application/json')
      .expect(401)
      .expect('Content-Type', /json/);
  });

  test('delete own user', async () => {
    const res = await testClient
      .delete(`/user/${sampleUser.id}`)
      .set('Cookie', [`access_token=${generateAccessTokenByUser(sampleUser)}`])
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('success', true);
  });

  test('normal user delete other user', async () => {
    const sampleUser = sampleUsers.find(
      (user) => user.id !== sampleNormalUser.id
    );
    const res = await testClient
      .delete(`/user/${sampleUser.id}`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleNormalUser)}`
      ])
      .set('Accept', 'application/json')
      .expect(403)
      .expect('Content-Type', /json/);
  });
});
