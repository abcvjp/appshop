const testClient = require("../../testClient");
const { queryInterface } = require("../../../models");
const { User } = require("../../../models");
const sampleUsers = require("../../../sample-data/user.sample");
const { generateRefreshTokenByUser } = require("../../../helpers/jwt.helper");
const { extractCookies } = require("../../utils");
const { JWT } = require("../../../helpers");

beforeAll(async () => {
  await queryInterface.bulkDelete("Users", null, {});
  await queryInterface.bulkInsert("Users", sampleUsers);
});

describe("GET /user/refresh-token", () => {
  // prepare data
  const sampleUser =
    sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
  const refreshToken = generateRefreshTokenByUser(sampleUser);

  beforeEach(async () => {
    const dbUser = await User.findOne({
      where: { username: sampleUser.username },
    });
    await dbUser.update({
      refresh_token: refreshToken,
    });
  });

  test("with valid refresh token", async () => {
    const res = await testClient
      .get(`/user/refresh-token`)
      .set("Cookie", [`refresh_token=${refreshToken}`])
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("access_token");
    expect(res.body).toHaveProperty("refresh_token");

    // check access_token in res cookies
    const cookies = extractCookies(res.headers);
    expect(cookies).toHaveProperty("access_token");
    expect(cookies).toHaveProperty("refresh_token");
    expect(JWT.verifyAccessToken(cookies.access_token.value).username).toEqual(
      sampleUser.username
    );
    expect(
      JWT.verifyRefreshToken(cookies.refresh_token.value).username
    ).toEqual(sampleUser.username);
  });

  test("with invalid refresh token", async () => {
    const res = await testClient
      .get(`/user/refresh-token`)
      .set("Cookie", [`refresh_token='invalid-refresh-token'`])
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", false);
  });

  test("without refresh token", async () => {
    const res = await testClient
      .get(`/user/refresh-token`)
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/);
    expect(res.body).toHaveProperty("success", false);
  });
});
