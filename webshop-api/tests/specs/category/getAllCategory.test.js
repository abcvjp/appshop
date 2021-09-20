const testClient = require("../../testClient");
const sampleCategories = require("../../../sample-data/category.sample");
const { queryInterface } = require("../../../models");
const { categoryMatcher } = require("../../matchers");

beforeAll(async () => {
  await queryInterface.bulkDelete("Categories", null, {});
  await queryInterface.bulkInsert("Categories", sampleCategories);
});

test("GET /category/all", async () => {
  await testClient
    .get(`/category/all`)
    .set("Accept", "application/json")
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.length).toEqual(sampleCategories.length);
      expect(res.body.data).toEqual(expect.arrayContaining([categoryMatcher]));
    });
});
