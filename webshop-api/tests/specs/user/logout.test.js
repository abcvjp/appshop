const testClient = require('../../testClient');
const { queryInterface } = require('../../../models');
const sampleUsers = require('../../../sample-data/user.sample');
const { generateAccessTokenByUser } = require('../../../helpers/jwt.helper');
const { extractCookies } = require('../../utils');

beforeAll(async () => {
  await queryInterface.bulkDelete('Users', null, {});
  await queryInterface.bulkInsert('Users', sampleUsers);
});

test('GET /user/logout', async () => {
  // prepare data
  const sampleUser =
    sampleUsers[Math.floor(Math.random() * sampleUsers.length)];

  const res = await testClient
    .get('/user/logout')
    .set('Cookie', [`access_token=${generateAccessTokenByUser(sampleUser)}`])
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/);
  expect(res.body).toHaveProperty('success', true);

  // check access_token in res cookies
  const cookies = extractCookies(res.headers);
  expect(cookies).toHaveProperty('access_token');
  expect(cookies.access_token.value).toEqual('');
});
