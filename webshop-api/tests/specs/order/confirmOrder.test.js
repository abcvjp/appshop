const testClient = require("../../testClient");
const { queryInterface } = require("../../../models");
const sampleOrders = require("../../../sample-data/order.sample");
const sampleUsers = require("../../../sample-data/user.sample");
const rolesHelper = require("../../../helpers/roles.helper");
const { generateAccessTokenByUser } = require("../../../helpers/jwt.helper");
const { Order } = require("../../../models");
const { orderMatcher } = require("../../matchers");
const { uuid } = require("uuidv4");

beforeAll(async () => {
  await queryInterface.bulkDelete("Orders", null, {});
  // await queryInterface.bulkInsert("Orders", sampleOrders);
});

afterEach(async () => {
  await queryInterface.bulkDelete("Orders", null, {});
});

describe("PUT /order/${orderId}/confirm", () => {
  // prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );
  const sampleOrder =
    sampleOrders[Math.floor(Math.random() * sampleOrders.length)];

  test("with pending order", async () => {
    const order = await Order.create(
      {
        ...sampleOrder,
        status: "Pending",
      },
      { hooks: false }
    );
    await testClient
      .put(`/order/${order.id}/confirm`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("success", true);
      });

    const orderAfterUpdate = await Order.findByPk(sampleOrder.id);
    expect(orderAfterUpdate.status).toEqual("Handling");
  });

  test("with handling order", async () => {
    const order = await Order.create(
      {
        ...sampleOrder,
        status: "Handling",
      },
      { hooks: false }
    );
    await testClient
      .put(`/order/${order.id}/confirm`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(409)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("success", false);
      });
  });

  test("with canceled order", async () => {
    const order = await Order.create(
      {
        ...sampleOrder,
        status: "Canceled",
      },
      { hooks: false }
    );
    await testClient
      .put(`/order/${order.id}/confirm`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(409)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("success", false);
      });
  });

  test("with completed order", async () => {
    const order = await Order.create(
      {
        ...sampleOrder,
        status: "Completed",
      },
      { hooks: false }
    );
    await testClient
      .put(`/order/${order.id}/confirm`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(409)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("success", false);
      });
  });

  test("with non-exist order", async () => {
    await testClient
      .put(`/order/${uuid()}/confirm`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(404)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toMatchObject({
          success: false,
        });
      });
  });

  test("without access token", async () => {
    const res = await testClient
      .put(`/order/${sampleOrder.id}/confirm`)
      .set("Accept", "application/json")
      .expect(401)
      .expect("Content-Type", /json/);
  });

  test("with forbidden user", async () => {
    const res = await testClient
      .put(`/order/${sampleOrder.id}/confirm`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleNormalUser)}`,
      ])
      .set("Accept", "application/json")
      .expect(403)
      .expect("Content-Type", /json/);
  });
});
