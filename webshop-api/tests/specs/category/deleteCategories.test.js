const testClient = require('../../testClient');
const sampleCategories = require('../../../sample-data/category.sample');
const { queryInterface } = require('../../../models');
const { Category } = require('../../../models');
const sampleUsers = require('../../../sample-data/user.sample');
const rolesHelper = require('../../../helpers/roles.helper');
const { generateAccessTokenByUser } = require('../../../helpers/jwt.helper');
const { uuid } = require('uuidv4');

beforeAll(async () => {
  await queryInterface.bulkDelete('Categories', null, {});
  await queryInterface.bulkInsert('Categories', sampleCategories);
});

afterEach(async () => {
  await queryInterface.bulkDelete('Categories', null, {});
  await queryInterface.bulkInsert('Categories', sampleCategories);
});

describe('delete /category', () => {
  // prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );

  test('with exist category ids', async () => {
    const sampleData = {
      categoryIds: sampleCategories.map((category) => category.id)
    };
    const res = await testClient
      .delete(`/category`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .send(sampleData)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('success', true);

    // check if delete success
    const categoriesFromDb = await Category.findAll();
    expect(categoriesFromDb.length).toEqual(0);
  });

  test('with non-exist category ids', async () => {
    const sampleData = {
      categoryIds: sampleCategories.map((category) => uuid())
    };
    const res = await testClient
      .delete(`/category`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`
      ])
      .set('Accept', 'application/json')
      .send(sampleData)
      .expect(404)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('success', false);

    // check if delete failed
    const categoriesFromDb = await Category.findAll();
    expect(categoriesFromDb.length).toEqual(sampleCategories.length);
  });

  test('without access token', async () => {
    const sampleData = {
      categoryIds: sampleCategories.map((category) => category.id)
    };
    const res = await testClient
      .delete(`/category`)
      .set('Accept', 'application/json')
      .send(sampleData)
      .expect(401)
      .expect('Content-Type', /json/);
  });

  test('with forbidden user', async () => {
    const sampleData = {
      categoryIds: sampleCategories.map((category) => category.id)
    };
    const res = await testClient
      .delete(`/category`)
      .set('Cookie', [
        `access_token=${generateAccessTokenByUser(sampleNormalUser)}`
      ])
      .set('Accept', 'application/json')
      .send(sampleData)
      .expect(403)
      .expect('Content-Type', /json/);
  });
});
