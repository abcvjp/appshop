const testClient = require("../../testClient");
const sampleCategories = require("../../../sample-data/category.sample");
const { queryInterface } = require("../../../models");
const { Category } = require("../../../models");
const sampleUsers = require("../../../sample-data/user.sample");
const rolesHelper = require("../../../helpers/roles.helper");
const { generateAccessTokenByUser } = require("../../../helpers/jwt.helper");
const { uuid } = require("uuidv4");

beforeAll(async () => {
  await queryInterface.bulkDelete("Categories", null, {});
  await queryInterface.bulkInsert("Categories", sampleCategories);
});

describe("delete /category/{categoryId}", () => {
  // prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );
  const sampleCategory =
    sampleCategories[Math.floor(Math.random() * sampleCategories.length)];

  afterEach(async () => {
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkInsert("Categories", sampleCategories);
  });

  test("delete exist category", async () => {
    const res = await testClient
      .delete(`/category/${sampleCategory.id}`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty("success", true);
    const checkResult = await Category.findByPk(sampleCategory.id);
    expect(checkResult).toBeNull;
  });

  test("delete non-exist category", async () => {
    const res = await testClient
      .delete(`/category/${uuid()}`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(404)
      .expect("Content-Type", /json/);

    expect(res.body).toHaveProperty("success", false);
  });

  test("without access token", async () => {
    const res = await testClient
      .delete(`/category/${sampleCategory.id}`)
      .set("Accept", "application/json")
      .expect(401)
      .expect("Content-Type", /json/);
  });

  test("with forbidden user", async () => {
    const res = await testClient
      .delete(`/category/${sampleCategory.id}`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleNormalUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(403)
      .expect("Content-Type", /json/);
  });
});
