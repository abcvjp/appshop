const getOrderReports = require('./operations/getOrderReports');

module.exports = {
  '/report/order': {
    get: getOrderReports
  }
};
