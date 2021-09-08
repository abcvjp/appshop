const getShippingMethods = require("./operations/getShippingMethods");

module.exports = {
  "/shipping/shipping_method": {
    get: getShippingMethods,
  },
};
