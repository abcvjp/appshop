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

describe('POST /user/:userId/reset-password', () => {
  // prepare data
  const sampleUser =
    sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
  const new_password = '1234567';

  test('with valid data', async () => {
    await testClient
      .post(`/user/${sampleUser.id}/reset-password`)
      .set('Cookie', [`access_token=${generateAccessTokenByUser(sampleUser)}`])
      .set('Accept', 'application/json')
      .send({
        current_password: '123456',
        new_password
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toHaveProperty('success', true);
      });
  });

  test('with non-exist user id', async () => {
    await testClient
      .post(`/user/${uuid()}/reset-password`)
      .set('Cookie', [`access_token=${generateAccessTokenByUser(sampleUser)}`])
      .set('Accept', 'application/json')
      .send({
        current_password: '123456',
        new_password
      })
      .expect(403)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toMatchObject({
          success: false
        });
      });
  });

  test('with wrong current_password', async () => {
    await testClient
      .post(`/user/${sampleUser.id}/reset-password`)
      .set('Cookie', [`access_token=${generateAccessTokenByUser(sampleUser)}`])
      .set('Accept', 'application/json')
      .send({
        current_password: '123456' + 'wrong',
        new_password
      })
      .expect(401)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toMatchObject({
          success: false
        });
      });
  });

  test("with request from stranger (not user's owner)", async () => {
    const strangeUser = sampleUsers.find((user) => user.id !== sampleUser.id);
    await testClient
      .post(`/user/${uuid()}/reset-password`)
      .set('Cookie', [`access_token=${generateAccessTokenByUser(strangeUser)}`])
      .set('Accept', 'application/json')
      .send({
        current_password: '123456',
        new_password
      })
      .expect(403)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toMatchObject({
          success: false
        });
      });
  });
});
