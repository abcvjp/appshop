const cartService = require('../services/cart.service');
const createError = require('http-errors');
const asyncHandler = require('express-async-handler');

exports.caculateSubTotal = asyncHandler(async (req, res, next) => {
  const { cart_items } = req.body;
  const result = await cartService.caculateSubTotal({ cart_items });
  res.status(200).json(result);
});

exports.checkCartValid = asyncHandler(async (req, res, next) => {
  const { cart_items } = req.body;
  const result = await cartService.checkCartValid({ cart_items });
  res.status(200).json(result);
});

exports.updateCart = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { cart_items } = req.body;
  const result = await cartService.updateCart({
    user_id: user.id,
    cart_items
  });
  res.status(200).json(result);
});
