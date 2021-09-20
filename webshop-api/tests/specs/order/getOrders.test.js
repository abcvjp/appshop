const testClient = require("../../testClient");
const { queryInterface } = require("../../../models");
const sampleOrders = require("../../../sample-data/order.sample");
const sampleUsers = require("../../../sample-data/user.sample");
const { paginationMatcher, orderMatcher } = require("../../matchers");
const rolesHelper = require("../../../helpers/roles.helper");
const { generateAccessTokenByUser } = require("../../../helpers/jwt.helper");
const moment = require("moment");

beforeAll(async () => {
  await queryInterface.bulkDelete("Orders", null, {});
  await queryInterface.bulkInsert("Orders", sampleOrders);
});

describe("GET /order/all", () => {
  // prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );
  const sampleOrder = [Math.floor(Math.random() * sampleOrders.length)];

  test("without any query param", async () => {
    await testClient
      .get("/order/all")
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toEqual(expect.arrayContaining([orderMatcher]));
        expect(res.body).toHaveProperty("pagination");
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test("with pagination param", async () => {
    await testClient
      .get("/order/all?current_page=1&page_size=5")
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([orderMatcher]));
        expect(res.body).toHaveProperty("pagination");
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  describe("with sort param", () => {
    const sortElemnents = [
      { name: "Newest", value: "createdAt.desc" },
      { name: "Oldest", value: "createdAt.asc" },
      { name: "Total (Low to High)", value: "order_total.asc" },
      { name: "Total (High to Low)", value: "order_total.desc" },
      { name: "Updated Recently", value: "updatedAt.desc" },
    ];
    sortElemnents.forEach((sortElement) => {
      test(`with 'sort=${sortElement.value}' param`, async () => {
        await testClient
          .get(`/order/all?sort=${sortElement.value}`)
          .set("Cookie", [
            `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
          ])
          .set("Accept", "application/json")
          .expect(200)
          .expect("Content-Type", /json/)
          .then((res) => {
            expect(res.body).toHaveProperty("success", true);
            expect(res.body).toHaveProperty("data");
            expect(res.body.data.length).toBeGreaterThan(0);
            expect(res.body.data).toEqual(
              expect.arrayContaining([orderMatcher])
            );
            expect(res.body).toHaveProperty("pagination");
            expect(res.body.pagination).toEqual(paginationMatcher);
          });
      });
    });
  });

  test("with start_date param", async () => {
    await testClient
      .get(
        `/order/all?start_date=${moment(sampleOrder.createdAt).format(
          "YYYY-MM-DD"
        )}`
      )
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([orderMatcher]));
        expect(res.body).toHaveProperty("pagination");
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test("with end_date param", async () => {
    await testClient
      .get(
        `/order/all?end_date=${moment(sampleOrder.createdAt)
          .add(1, "days")
          .format("YYYY-MM-DD")}`
      )
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([orderMatcher]));
        expect(res.body).toHaveProperty("pagination");
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test("with status param", async () => {
    await testClient
      .get(`/order/all?status=Pending`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([orderMatcher]));
        expect(res.body).toHaveProperty("pagination");
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test("with shipping_status param", async () => {
    await testClient
      .get(`/order/all?shipping_status=Undelivered`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([orderMatcher]));
        expect(res.body).toHaveProperty("pagination");
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test("with payment_status param", async () => {
    await testClient
      .get(`/order/all?payment_status=Unpaid`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data).toEqual(expect.arrayContaining([orderMatcher]));
        expect(res.body).toHaveProperty("pagination");
        expect(res.body.pagination).toEqual(paginationMatcher);
      });
  });

  test("without access token", async () => {
    const res = await testClient
      .get("/order/all")
      .set("Accept", "application/json")
      .expect(401)
      .expect("Content-Type", /json/);
  });

  test("with forbidden user", async () => {
    const res = await testClient
      .get("/order/all")
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleNormalUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(403)
      .expect("Content-Type", /json/);
  });
});
