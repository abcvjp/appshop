const paymentService = require('../services/payment.service');
const asyncHandler = require('express-async-handler');

exports.getPaymentMethods = asyncHandler(async (req, res, next) => {
  const result = await paymentService.getPaymentMethods();
  res.status(200).json(result);
});

exports.doPaymentWithStripe = asyncHandler(async (req, res, next) => {
  const { order_id, token_id } = req.body;
  const result = await paymentService.doPaymentWithStripe({
    order_id,
    token_id
  })
  res.status(200).json(result);
});

exports.createCardToken = asyncHandler(async (req, res, next) => {
  const result = await paymentService.createCardToken();
  res.status(200).json(result);
});