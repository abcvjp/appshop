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

  test('with valid email', async () => {
    const data = {
      email: sampleUser.email,
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
    expect(res.body).toHaveProperty('access_token');
    expect(res.body.user).toEqual(userMatcher);
    expect(res.body.user).toHaveProperty('id', sampleUser.id);

    // check access_token in res cookies
    const cookies = extractCookies(res.headers);
    expect(cookies).toHaveProperty('access_token');
    expect(JWT.verifyAccessToken(cookies.access_token.value).email).toEqual(
      data.email
    );
  });

  test('with non-exist email', async () => {
    const data = {
      email: 'non-exist@email.com',
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
      email: sampleUser.email,
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
