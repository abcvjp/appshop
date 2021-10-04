const testClient = require('../../testClient');
const { categoryMatcher } = require('../../matchers');
const sampleCategories = require('../../../sample-data/category.sample');
const { queryInterface } = require('../../../models');
const sampleUsers = require('../../../sample-data/user.sample');
const rolesHelper = require('../../../helpers/roles.helper');
const { generateAccessTokenByUser } = require('../../../helpers/jwt.helper');

beforeAll(async () => {
  await queryInterface.bulkDelete('Categories', null, {});
  await queryInterface.bulkInsert('Categories', sampleCategories);
});

describe('post /category', () => {
  //prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );
  const sampleAccessToken = generateAccessTokenByUser(sampleAdminUser);
  const sampleData = {
    name: 'Test category',
    published: true,
    description: 'this is a category description',
    meta_title: 'Test category title',
    meta_description: 'this is a category description',
    meta_keywords: 'this is categoy keywords',
    parent_id:
      sampleCategories[Math.floor(Math.random() * sampleCategories.length)].id
  };

  afterEach(async () => {
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkInsert('Categories', sampleCategories);
  });

  test('with valid request', async () => {
    const res = await testClient
      .post('/category')
      .set('Cookie', [`access_token=${sampleAccessToken}`])
      .set('Accept', 'application/json')
      .send(sampleData)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toEqual(categoryMatcher);
  });

  test('with duplicated name', async () => {
    const duplicatedName =
      sampleCategories[Math.floor(Math.random() * sampleCategories.length)]
        .name;
    const res = await testClient
      .post('/category')
      .set('Cookie', [`access_token=${sampleAccessToken}`])
      .set('Accept', 'application/json')
      .send({ ...sampleData, name: duplicatedName })
      .expect(409)
      .expect('Content-Type', /json/);
    expect(res.body).toEqual(
      expect.objectContaining({
        success: false
      })
    );
  });

  test('without access token', async () => {
    const res = await testClient
      .post('/category')
      .set('Accept', 'application/json')
      .send(sampleData)
      .expect(401)
      .expect('Content-Type', /json/);
  });

  test('with forbidden user', async () => {
    const res = await testClient
      .post('/category')
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleNormalUser)}`
      ])
      .set('Accept', 'application/json')
      .send(sampleData)
      .expect(403)
      .expect('Content-Type', /json/);
  });
});
