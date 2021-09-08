const checkItemsValid = require("./operations/checkItemsValid");

module.exports = {
  "/cart/check_valid": {
    post: checkItemsValid,
  },
};
