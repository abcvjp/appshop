const testClient = require("../../testClient");
const { User } = require("../../../models");
const sampleUsers = require("../../../sample-data/user.sample");
const { queryInterface } = require("../../../models");

beforeAll(async () => {
  await queryInterface.bulkDelete("Users", null, {});
});

afterEach(async () => {
  await queryInterface.bulkDelete("Users", null, {});
});

afterAll(async () => {
  await queryInterface.bulkInsert("Users", sampleUsers);
});

describe("POST /user", () => {
  //prepare data
  const sampleUser =
    sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
  const sampleData = {
    username: sampleUser.username,
    password: "123456",
    full_name: sampleUser.full_name,
    email: sampleUser.email,
  };
  const { username, password, full_name, email } = sampleData;

  test("with valid request", async () => {
    const res = await testClient
      .post("/user/signup")
      .set("Accept", "application/json")
      .send(sampleData)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toMatchObject({
      username,
      email,
      full_name,
    });
    const userFromDb = await User.findOne({ where: { username } });
    expect(userFromDb).not.toEqual(null);
    expect(userFromDb).toMatchObject({
      username,
      email,
      full_name,
    });
  });

  test("with existed-username request", async () => {
    await queryInterface.bulkInsert("Users", sampleUsers);
    const data = {
      username: sampleUser.username,
      password: "123456",
      full_name: sampleUser.full_name,
      email: "clone" + sampleUser.email,
    };
    const res = await testClient
      .post("/user/signup")
      .set("Accept", "application/json")
      .send(data)
      .expect(409)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", false);
  });

  test("with existed-email request", async () => {
    await queryInterface.bulkInsert("Users", sampleUsers);
    const data = {
      username: "clone" + sampleUser.username,
      password: "123456",
      full_name: sampleUser.full_name,
      email: sampleUser.email,
    };
    const res = await testClient
      .post("/user/signup")
      .set("Accept", "application/json")
      .send(data)
      .expect(409)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", false);
  });
});
