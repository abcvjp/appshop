const { PaymentMethod } = require('../models');
const createError = require('http-errors');

exports.getPaymentMethods = async () => {
  try {
    const paymentMethods = await PaymentMethod.findAll();
    if (paymentMethods.length < 1)
      throw createError(404, "Can't find any payment method");
    return {
      success: true,
      data: paymentMethods
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};
