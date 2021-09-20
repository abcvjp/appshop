const testClient = require("../../testClient");
const { categoryMatcher } = require("../../matchers");
const sampleCategories = require("../../../sample-data/category.sample");
const { queryInterface } = require("../../../models");
const sampleUsers = require("../../../sample-data/user.sample");
const rolesHelper = require("../../../helpers/roles.helper");
const { generateAccessTokenByUser } = require("../../../helpers/jwt.helper");

beforeAll(async () => {
  await queryInterface.bulkDelete("Categories", null, {});
  await queryInterface.bulkInsert("Categories", sampleCategories);
});

describe("put /category/{categoryId}", () => {
  // prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );
  const sampleCategory =
    sampleCategories[Math.floor(Math.random() * sampleCategories.length)];
  let {
    name,
    published,
    description,
    meta_title,
    meta_description,
    meta_keywords,
    parent_id,
  } = sampleCategory;
  const newData = {
    name: name + "changed",
    published: !published,
    description: description + "changed",
    meta_title: meta_title + "changeddddddddddddddddddd",
    meta_description: meta_description + "changeddddddddddddddddddddddddddd",
    meta_keywords: meta_keywords + "changedddddddddddddddddddddddddd",
    parent_id,
  };

  afterEach(async () => {
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkInsert("Categories", sampleCategories);
  });

  test("with all property change", async () => {
    const res = await testClient
      .put(`/category/${sampleCategory.id}`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .send(newData)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("result");
    expect(res.body.result).toEqual(categoryMatcher);

    expect(res.body.result).not.toMatchObject({
      name,
      published,
      description,
      meta_title,
      meta_description,
      meta_keywords,
      parent_id,
    });
  });

  test("without access token", async () => {
    const res = await testClient
      .put(`/category/${sampleCategory.id}`)
      .set("Accept", "application/json")
      .send(newData)
      .expect(401)
      .expect("Content-Type", /json/);
  });

  test("with forbidden user", async () => {
    const res = await testClient
      .put(`/category/${sampleCategory.id}`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleNormalUser)}`,
      ])
      .set("Accept", "application/json")
      .send(newData)
      .expect(403)
      .expect("Content-Type", /json/);
  });
});
