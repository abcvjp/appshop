const testClient = require("../../testClient");
const { queryInterface } = require("../../../models");
const sampleProducts = require("../../../sample-data/product.sample");
const { Product } = require("../../../models");
const { uuid } = require("uuidv4");
const { validItemMacher } = require("../../matchers");

beforeAll(async () => {
  await queryInterface.bulkDelete("Products", null, {});
  await queryInterface.bulkInsert("Products", sampleProducts);
});

describe("POST /cart/check_valid", () => {
  test("with valid cart items", async () => {
    const data = {
      cart_items: sampleProducts
        .filter((product) => product.quantity > 0 && product.enable)
        .map((product) => ({
          product_id: product.id,
          product_name: product.name,
          price: product.price,
          quantity: 1,
        })),
    };
    const res = await testClient
      .post("/cart/check_valid")
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).not.toHaveProperty("errors");
    expect(res.body).toHaveProperty("subTotal");
  });

  test("with nonexist-product-id items", async () => {
    const data = {
      cart_items: sampleProducts
        .filter((product) => product.quantity > 0 && product.enable)
        .map((product) => ({
          product_id: uuid(),
          product_name: product.name,
          price: product.price,
          quantity: 1,
        })),
    };
    const res = await testClient
      .post("/cart/check_valid")
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("errors");
    expect(res.body).toHaveProperty("valid_items");
    expect(Object.keys(res.body.errors).length).toEqual(data.cart_items.length);
    expect(res.body.valid_items.length).toEqual(data.cart_items.length);
    expect(res.body.valid_items).toEqual(
      expect.arrayContaining([validItemMacher])
    );
    expect(
      res.body.valid_items.every((item) => item.buy_able === false)
    ).toEqual(true);
  });

  test("with nonexist-product-id items", async () => {
    const data = {
      cart_items: sampleProducts
        .filter((product) => product.quantity > 0 && product.enable)
        .map((product) => ({
          product_id: uuid(),
          product_name: product.name,
          price: product.price,
          quantity: 1,
        })),
    };
    const res = await testClient
      .post("/cart/check_valid")
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("errors");
    expect(res.body).toHaveProperty("valid_items");
    expect(Object.keys(res.body.errors).length).toEqual(data.cart_items.length);
    expect(res.body.valid_items.length).toEqual(data.cart_items.length);
    expect(res.body.valid_items).toEqual(
      expect.arrayContaining([validItemMacher])
    );
    expect(
      res.body.valid_items.every((item) => item.buy_able === false)
    ).toEqual(true);
  });

  test("with wrong-product-name items", async () => {
    const data = {
      cart_items: sampleProducts
        .filter((product) => product.quantity > 0 && product.enable)
        .map((product) => ({
          product_id: product.id,
          product_name: product.name + "changed",
          price: product.price,
          quantity: 1,
        })),
    };
    const res = await testClient
      .post("/cart/check_valid")
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("errors");
    expect(res.body).toHaveProperty("valid_items");
    expect(Object.keys(res.body.errors).length).toEqual(data.cart_items.length);
    expect(res.body.valid_items.length).toEqual(data.cart_items.length);
    expect(res.body.valid_items).toEqual(
      expect.arrayContaining([validItemMacher])
    );
    expect(
      res.body.valid_items.every((item) => item.buy_able === true)
    ).toEqual(true);
  });

  test("with wrong-product-price items", async () => {
    const data = {
      cart_items: sampleProducts
        .filter((product) => product.quantity > 0 && product.enable)
        .map((product) => ({
          product_id: product.id,
          product_name: product.name,
          price: product.price + 1.0,
          quantity: 1,
        })),
    };
    const res = await testClient
      .post("/cart/check_valid")
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("errors");
    expect(res.body).toHaveProperty("valid_items");
    expect(Object.keys(res.body.errors).length).toEqual(data.cart_items.length);
    expect(res.body.valid_items.length).toEqual(data.cart_items.length);
    expect(res.body.valid_items).toEqual(
      expect.arrayContaining([validItemMacher])
    );
    expect(
      res.body.valid_items.every((item) => item.buy_able === true)
    ).toEqual(true);
  });

  test("with not-enough-quantity items", async () => {
    const data = {
      cart_items: sampleProducts
        .filter((product) => product.quantity > 0 && product.enable)
        .map((product) => ({
          product_id: product.id,
          product_name: product.name,
          price: product.price,
          quantity: product.quantity + 1,
        })),
    };
    const res = await testClient
      .post("/cart/check_valid")
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("errors");
    expect(res.body).toHaveProperty("valid_items");
    expect(Object.keys(res.body.errors).length).toEqual(data.cart_items.length);
    expect(res.body.valid_items.length).toEqual(data.cart_items.length);
    expect(res.body.valid_items).toEqual(
      expect.arrayContaining([validItemMacher])
    );
    expect(
      res.body.valid_items.every((item) => item.buy_able === true)
    ).toEqual(true);
  });

  test("with disabled-product items", async () => {
    const data = {
      cart_items: sampleProducts
        .filter((product) => product.quantity > 0 && !product.enable)
        .map((product) => ({
          product_id: product.id,
          product_name: product.name,
          price: product.price,
          quantity: 1,
        })),
    };
    const res = await testClient
      .post("/cart/check_valid")
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("errors");
    expect(res.body).toHaveProperty("valid_items");
    expect(Object.keys(res.body.errors).length).toEqual(data.cart_items.length);
    expect(res.body.valid_items.length).toEqual(data.cart_items.length);
    expect(res.body.valid_items).toEqual(
      expect.arrayContaining([validItemMacher])
    );
    expect(
      res.body.valid_items.every((item) => item.buy_able === false)
    ).toEqual(true);
  });

  test("with product-is-out-of-stock items", async () => {
    const data = {
      cart_items: sampleProducts
        .filter((product) => product.quantity === 0 && product.enable)
        .map((product) => ({
          product_id: product.id,
          product_name: product.name,
          price: product.price,
          quantity: 1,
        })),
    };
    const res = await testClient
      .post("/cart/check_valid")
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("errors");
    expect(res.body).toHaveProperty("valid_items");
    expect(Object.keys(res.body.errors).length).toEqual(data.cart_items.length);
    expect(res.body.valid_items.length).toEqual(data.cart_items.length);
    expect(res.body.valid_items).toEqual(
      expect.arrayContaining([validItemMacher])
    );
    expect(
      res.body.valid_items.every((item) => item.buy_able === false)
    ).toEqual(true);
  });
});
