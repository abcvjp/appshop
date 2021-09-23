const getPaymentMethods = require('./operations/getPaymentMethods');

module.exports = {
  '/payment/payment_method': {
    get: getPaymentMethods
  }
};
