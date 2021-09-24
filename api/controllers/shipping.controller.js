const shippingService = require('../services/shipping.service');
const asyncHandler = require('express-async-handler');

exports.getShippingMethods = asyncHandler(async (req, res, next) => {
  const result = await shippingService.getShippingMethods();
  res.status(200).json(result);
});
