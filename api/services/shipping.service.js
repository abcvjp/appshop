const { ShippingMethod } = require('../models');
const createError = require('http-errors');

exports.getShippingMethods = async () => {
  try {
    const shippingMethods = await ShippingMethod.findAll();
    
    return {
      success: true,
      data: shippingMethods
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};
