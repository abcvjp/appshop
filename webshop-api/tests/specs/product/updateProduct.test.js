const testClient = require("../../testClient");
const { productMatcher } = require("../../matchers");
const sampleProducts = require("../../../sample-data/product.sample");
const { queryInterface } = require("../../../models");
const sampleUsers = require("../../../sample-data/user.sample");
const rolesHelper = require("../../../helpers/roles.helper");
const { generateAccessTokenByUser } = require("../../../helpers/jwt.helper");

beforeAll(async () => {
  await queryInterface.bulkDelete("Products", null, {});
  await queryInterface.bulkInsert("Products", sampleProducts);
});

afterEach(async () => {
  await queryInterface.bulkDelete("Products", null, {});
  await queryInterface.bulkInsert("Products", sampleProducts);
});

describe("put /product/{productId}", () => {
  // prepare data
  const sampleAdminUser = sampleUsers.find(
    (user) => user.role === rolesHelper.Admin
  );
  const sampleNormalUser = sampleUsers.find(
    (user) => user.role === rolesHelper.User
  );
  const sampleAccessToken = generateAccessTokenByUser(sampleAdminUser);
  const sampleProduct =
    sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
  let {
    id,
    name,
    title,
    enable,
    published,
    price,
    quantity,
    root_price,
    short_description,
    description,
    images,
    meta_title,
    meta_description,
    meta_keywords,
  } = sampleProduct;
  const newData = {
    name: name + "changed",
    title: title + "changed",
    enable: !enable,
    published: !published,
    price: price + 1.0,
    root_price: root_price + 1.0,
    short_description: short_description + "changed",
    description: description + "changed",
    images: JSON.parse(images).concat({
      url: "https://salt.tikicdn.com/ts/product/f0/f9/63/6f987aed1912faf0248639e533616f50.jpg",
    }),
    meta_title: meta_title + "changedddddddddddddddddddddd",
    meta_description: meta_description + "changedddddddddddddddddddddddddddd",
    meta_keywords: meta_keywords + "changeddddddddddddddddddddddddddddd",
  };

  test("with all property change", async () => {
    const res = await testClient
      .put(`/product/${id}`)
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleAdminUser)}`,
      ])
      .set("Accept", "application/json")
      .send(newData)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("result");
    expect(res.body.result).toEqual(productMatcher);

    expect(res.body.result).not.toMatchObject({
      name,
      title,
      enable,
      published,
      price,
      quantity,
      root_price,
      short_description,
      description,
      images,
      meta_title,
      meta_description,
      meta_keywords,
    });
  });

  test("without access token", async () => {
    const res = await testClient
      .put("/product")
      .set("Accept", "application/json")
      .send(newData)
      .expect(401)
      .expect("Content-Type", /json/);
  });

  test("with forbidden user", async () => {
    const res = await testClient
      .put("/product")
      .set("Cookie", [
        `access_token=${generateAccessTokenByUser(sampleNormalUser)}`,
      ])
      .set("Accept", "application/json")
      .send(newData)
      .expect(403)
      .expect("Content-Type", /json/);
  });
});
