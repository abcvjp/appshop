const { ShippingMethod } = require('../models');
const createError = require('http-errors');

exports.getShippingMethods = async () => {
  try {
    const shippingMethods = await ShippingMethod.findAll();
    if (shippingMethods.length < 1)
      throw createError(404, "Can't find any shipping method");
    return {
      success: true,
      data: shippingMethods
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};
