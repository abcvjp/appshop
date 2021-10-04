const testClient = require('../../testClient');
const { User } = require('../../../models');
const sampleUsers = require('../../../sample-data/user.sample');
const { userMatcher } = require('../../matchers');
const { queryInterface } = require('../../../models');

beforeAll(async () => {
  await queryInterface.bulkDelete('Users', null, {});
});

afterEach(async () => {
  await queryInterface.bulkDelete('Users', null, {});
});

afterAll(async () => {
  await queryInterface.bulkInsert('Users', sampleUsers);
});

describe('POST /user', () => {
  //prepare data
  const sampleUser =
    sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
  const sampleData = {
    username: sampleUser.username,
    password: '123456',
    full_name: sampleUser.full_name,
    phone_number: sampleUser.phone_number,
    email: sampleUser.email
  };
  const { username, password, full_name, email, phone_number } = sampleData;

  test('with valid request', async () => {
    const res = await testClient
      .post('/user/signup')
      .set('Accept', 'application/json')
      .send(sampleData)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toEqual(userMatcher);

    const userFromDb = await User.findOne({ where: { username } });
    expect(userFromDb).not.toEqual(null);
    expect(userFromDb).toMatchObject({
      username,
      email,
      full_name,
      phone_number
    });
  });

  test('with existed-username request', async () => {
    await queryInterface.bulkInsert('Users', sampleUsers);
    const data = {
      username,
      password: '123456',
      full_name,
      email: 'clone' + sampleUser.email,
      phone_number
    };
    const res = await testClient
      .post('/user/signup')
      .set('Accept', 'application/json')
      .send(data)
      .expect(409)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('success', false);
  });

  test('with existed-email request', async () => {
    await queryInterface.bulkInsert('Users', sampleUsers);
    const data = {
      username: 'clone' + username,
      password: '123456',
      full_name,
      email,
      phone_number
    };
    const res = await testClient
      .post('/user/signup')
      .set('Accept', 'application/json')
      .send(data)
      .expect(409)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('success', false);
  });

  test('with existed-phone-number request', async () => {
    await queryInterface.bulkInsert('Users', sampleUsers);
    const data = {
      username,
      password: '123456',
      full_name,
      email,
      phone_number: (
        Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000
      ) // random 10 digit number
        .toString()
    };
    const res = await testClient
      .post('/user/signup')
      .set('Accept', 'application/json')
      .send(data)
      .expect(409)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('success', false);
  });
});
