const testClient = require("../../testClient");
const sampleShippingMethods = require("../../../sample-data/shipping-method.sample");
const { queryInterface } = require("../../../models");
const { shippingMethodMatcher } = require("../../matchers");

test("GET /shipping/shipping_method", async () => {
  await testClient
    .get("/shipping/shipping_method")
    .set("Accept", "application/json")
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.length).toEqual(sampleShippingMethods.length);
      expect(res.body.data).toEqual(
        expect.arrayContaining([shippingMethodMatcher])
      );
    });
});
