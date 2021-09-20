const testClient = require("../../testClient");
const { orderMatcher } = require("../../matchers");
const sampleOrders = require("../../../sample-data/order.sample");
const { queryInterface } = require("../../../models");
const sampleUsers = require("../../../sample-data/user.sample");
const rolesHelper = require("../../../helpers/roles.helper");
const { Order } = require("../../../models");
const { generateAccessTokenByUser } = require("../../../helpers/jwt.helper");
const { uuid } = require("uuidv4");

beforeAll(async () => {
  await queryInterface.bulkDelete("Orders", null, {});
  // await queryInterface.bulkInsert("Orders", sampleOrders);
});

afterEach(async () => {
  await queryInterface.bulkDelete("Orders", null, {});
});

describe("put /order", () => {
  // prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );

  describe("with valid before-after status", () => {
    const scences = [
      ["Pending", "Handling"],
      ["Pending", "Canceled"],
      ["Handling", "Completed"],
      ["Handling", "Canceled"],
    ];
    scences.forEach((statuses) => {
      test(`with ${statuses[0]}-${statuses[1]} status changing`, async () => {
        const dbData = sampleOrders.map((order) => ({
          ...order,
          status: statuses[0],
        }));
        await Order.bulkCreate(dbData);

        const data = {
          orders: sampleOrders.map((order) => ({
            id: order.id,
            status: statuses[1],
          })),
        };

        const res = await testClient
          .put("/order")
          .set("Cookie", [
            `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
          ])
          .set("Accept", "application/json")
          .send(data)
          .expect(200)
          .expect("Content-Type", /json/);
        expect(res.body).toHaveProperty("success", true);

        const ordersFromDb = await Order.findAll();
        expect(
          ordersFromDb.every((order) => order.status == statuses[1])
        ).toEqual(true);
      });
    });
  });

  describe("with invalid before-after status", () => {
    const scences = [
      ["Pending", "Pending"],
      ["Pending", "Completed"],
      ["Handling", "Pending"],
      ["Handling", "Handling"],
      ["Completed", "Pending"],
      ["Completed", "Handling"],
      ["Completed", "Completed"],
      ["Completed", "Canceled"],
      ["Canceled", "Pending"],
      ["Canceled", "Handling"],
      ["Canceled", "Completed"],
      ["Canceled", "Canceled"],
    ];
    scences.forEach((statuses) => {
      test(`with ${statuses[0]}-${statuses[1]} status changing`, async () => {
        const dbData = sampleOrders.map((order) => ({
          ...order,
          status: statuses[0],
        }));
        await Order.bulkCreate(dbData);

        const data = {
          orders: sampleOrders.map((order) => ({
            id: order.id,
            status: statuses[1],
          })),
        };

        const res = await testClient
          .put("/order")
          .set("Cookie", [
            `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
          ])
          .set("Accept", "application/json")
          .send(data)
          .expect(409)
          .expect("Content-Type", /json/);
        expect(res.body).toHaveProperty("success", false);
      });
    });
  });

  test("with non-exist order", async () => {
    await Order.bulkCreate(sampleOrders);
    const data = {
      orders: sampleOrders.map((x) => ({
        id: uuid(),
        status: "Handling",
      })),
    };
    const res = await testClient
      .put(`/order`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .send(data)
      .expect(404)
      .expect("Content-Type", /json/);
  });

  test("without access token", async () => {
    const data = {
      orders: sampleOrders.map((x) => ({
        id: x.id,
        status: "Handling",
      })),
    };
    const res = await testClient
      .put(`/order`)
      .set("Accept", "application/json")
      .send(data)
      .expect(401)
      .expect("Content-Type", /json/);
  });

  test("with forbidden user", async () => {
    const data = {
      orders: sampleOrders.map((x) => ({
        id: x.id,
        status: "Handling",
      })),
    };
    const res = await testClient
      .put(`/order`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleNormalUser)}`,
      ])
      .set("Accept", "application/json")
      .send(data)
      .expect(403)
      .expect("Content-Type", /json/);
  });
});
