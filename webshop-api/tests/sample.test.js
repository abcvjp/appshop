const server = require("../server");
const supertest = require("supertest");

describe("GET /product/all", () => {
  it("with normal user", async () => {
    await supertest(server)
      .get("/product/all")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("success");
        expect(res.body.success).toEqual(true);
        expect(res.body).toHaveProperty("data");
        expect(Array.isArray(res.body.data.data));
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body).toHaveProperty("pagination");
      });
  });

  afterAll((done) => {
    server.close(() => {
      console.log("close server test");
      done();
    });
  });
});
