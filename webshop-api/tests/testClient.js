const server = require("..//server");
const supertest = require("supertest");

module.exports = supertest(server);
