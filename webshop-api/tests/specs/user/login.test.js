const testClient = require('../../testClient');
const { queryInterface } = require('../../../models');
const sampleUsers = require('../../../sample-data/user.sample');
const { userMatcher } = require('../../matchers');
const { extractCookies } = require('../../utils');
const { JWT } = require('../../../helpers');

beforeAll(async () => {
  await queryInterface.bulkDelete('Users', null, {});
  await queryInterface.bulkInsert('Users', sampleUsers);
});

describe('POST /user/login', () => {
  // prepare data
  const sampleUser =
    sampleUsers[Math.floor(Math.random() * sampleUsers.length)];

  test('with valid username and email', async () => {
    const data = {
      username: sampleUser.username,
      password: '123456'
    };

    const res = await testClient
      .post(`/user/login`)
      .set('Accept', 'application/json')
      .send(data)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toEqual(userMatcher);
    expect(res.body).toHaveProperty('access_token');

    // check access_token in res cookies
    const cookies = extractCookies(res.headers);
    expect(cookies).toHaveProperty('access_token');
    expect(JWT.verifyAccessToken(cookies.access_token.value).username).toEqual(
      data.username
    );
  });

  test('with non-exist username', async () => {
    const data = {
      username: 'non-exist-username',
      password: '123456'
    };
    const res = await testClient
      .post(`/user/login`)
      .set('Accept', 'application/json')
      .send(data)
      .expect(404)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('success', false);
  });

  test('with wrong password', async () => {
    const data = {
      username: sampleUser.username,
      password: 'wrongpassword'
    };
    const res = await testClient
      .post(`/user/login`)
      .set('Accept', 'application/json')
      .send(data)
      .expect(401)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('success', false);
  });
});
