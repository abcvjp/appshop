const testClient = require("../../testClient");
const sampleProducts = require("../../../sample-data/product.sample");
const sampleUsers = require("../../../sample-data/user.sample");
const { queryInterface } = require("../../../models");
const rolesHelper = require("../../../helpers/roles.helper");
const { generateAccessTokenByUser } = require("../../../helpers/jwt.helper");
const { Order } = require("../../../models");
const { uuid } = require("uuidv4");

const matcher = expect.objectContaining({
  id: expect.any(String),
  payment_method_id: expect.any(Number),
  shipping_method_id: expect.any(Number),
  email: expect.any(String),
  order_items: expect.any(Array),
});

beforeAll(async () => {
  await queryInterface.bulkDelete("Orders", null, {});
  await queryInterface.bulkDelete("Products", null, {});
  await queryInterface.bulkInsert("Products", sampleProducts);
});

afterEach(async () => {
  await queryInterface.bulkDelete("Orders", null, {});
});

describe("post /order", () => {
  //prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );
  const sampleAccessToken = generateAccessTokenByUser(sampleAdminUser);
  const sampleProduct = sampleProducts.find((product) => product.quantity > 10);
  const sampleData = {
    customer_name: "Hoai dep trai",
    address: "85 Xuan Thuy, Dich Vong Hau, Cau Giay, Ha Noi",
    email: "example@example.com",
    phone_number: "0123456789",
    shipping_note: "Giao hang xong nho khen hoai dep trai",
    payment_method_id: 1,
    shipping_method_id: 2,
    order_items: [
      {
        product_id: sampleProduct.id,
        price: sampleProduct.price,
        quantity: 1,
        product_name: sampleProduct.name,
      },
    ],
  };

  test("with valid request", async () => {
    const res = await testClient
      .post("/order")
      .set("Cookie", [`access_token=${sampleAccessToken}`])
      .set("Accept", "application/json")
      .send(sampleData)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("result");
    expect(res.body.result).toEqual(matcher);
    const testResult = await Order.findAll();
    expect(testResult.length).toEqual(1);
  });

  test("with non-exist product", async () => {
    const data = { ...sampleData };
    data.order_items[0].product_id = uuid();

    const res = await testClient
      .post("/order")
      .set("Cookie", [`access_token=${sampleAccessToken}`])
      .set("Accept", "application/json")
      .send(data)
      .expect(409)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", false);
    const testResult = await Order.findAll();
    expect(testResult.length).toEqual(0);
  });

  test("with price of product changed", async () => {
    const data = { ...sampleData };
    data.order_items[0].price += 1.0;

    const res = await testClient
      .post("/order")
      .set("Cookie", [`access_token=${sampleAccessToken}`])
      .set("Accept", "application/json")
      .send(data)
      .expect(409)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", false);
    const testResult = await Order.findAll();
    expect(testResult.length).toEqual(0);
  });

  test("with name of product changed", async () => {
    const data = { ...sampleData };
    data.order_items[0].product_name += "changed";

    const res = await testClient
      .post("/order")
      .set("Cookie", [`access_token=${sampleAccessToken}`])
      .set("Accept", "application/json")
      .send(data)
      .expect(409)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", false);
    const testResult = await Order.findAll();
    expect(testResult.length).toEqual(0);
  });

  test("with out of stock product", async () => {
    const outStockProduct = sampleProducts.find(
      (product) => product.quantity === 0
    );
    const data = { ...sampleData };
    data.order_items = [
      {
        product_id: outStockProduct.id,
        price: outStockProduct.price,
        quantity: 1,
        product_name: outStockProduct.name,
      },
    ];

    const res = await testClient
      .post("/order")
      .set("Cookie", [`access_token=${sampleAccessToken}`])
      .set("Accept", "application/json")
      .send(data)
      .expect(409)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", false);
    const testResult = await Order.findAll();
    expect(testResult.length).toEqual(0);
  });

  //test("with duplicated name", async () => {
  //const duplicatedName = sampleOrders[0].name;
  //const res = await testClient
  //.post("/order")
  //.set("Cookie", [`access_token=${sampleAccessToken}`])
  //.set("Accept", "application/json")
  //.send({ ...sampleData, name: duplicatedName })
  //.expect(409)
  //.expect("Content-Type", /json/);
  //expect(res.body).toEqual(
  //expect.objectContaining({
  //success: false,
  //})
  //);
  //});
});
