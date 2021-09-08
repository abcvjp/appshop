const getUserById = require("./operations/getUserById");
const login = require("./operations/login");
const logout = require("./operations/logout");

module.exports = {
  "/user/{userId}": {
    get: getUserById,
  },
  "/user/login": {
    post: login,
  },
  "/user/logout": {
    get: logout,
  },
};
