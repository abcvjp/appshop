const orderService = require('../services/order.service');
const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const Role = require('../helpers/roles.helper');

exports.createOrder = asyncHandler(async (req, res, next) => {
  const user_id = req.user ? req.user.id : null;
  const {
    customer_name,
    address,
    email,
    phone_number,
    shipping_note,
    payment_method_id,
    shipping_method_id,
    order_items
  } = req.body;
  const result = await orderService.createOrder({
    user_id,
    customer_name,
    address,
    email,
    phone_number,
    shipping_note,
    payment_method_id,
    shipping_method_id,
    order_items
  });
  res.status(200).json(result);
});

exports.updateOrderInfo = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const {
    customer_name,
    address,
    email,
    phone_number,
    shipping_note,
    payment_status,
    shipping_status
  } = req.body;
  const result = await orderService.updateOrderInfo({
    id: orderId,
    customer_name,
    address,
    email,
    phone_number,
    shipping_note
  });
  res.status(200).json(result);
});

exports.updateOrdersStatus = asyncHandler(async (req, res, next) => {
  const { orders } = req.body;
  const result = await orderService.updateOrdersStatus({ orders });
  res.status(200).json(result);
});

exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const result = await orderService.deleteOrder({ id: orderId });
  res.status(200).json(result);
});

exports.getOrders = asyncHandler(async (req, res, next) => {
  const {
    id,
    code,
    customer_name,
    email,
    phone_number,
    status,
    payment_status,
    shipping_status,
    start_date,
    end_date,
    current_page,
    page_size,
    sort
  } = req.query;
  const result = await orderService.getOrders({
    id,
    code,
    customer_name,
    email,
    phone_number,
    status,
    payment_status,
    shipping_status,
    start_date,
    end_date,
    current_page,
    page_size,
    sort
  });
  res.status(200).json(result);
});

exports.getOrdersByUserId = asyncHandler(async (req, res, next) => {
  const user_id = req.user.id;
  const {
    code,
    status,
    payment_status,
    shipping_status,
    start_date,
    end_date,
    current_page,
    page_size,
    sort
  } = req.query;
  const result = await orderService.getOrdersByUserId({
    user_id,
    code,
    status,
    payment_status,
    shipping_status,
    start_date,
    end_date,
    current_page,
    page_size,
    sort
  });
  res.status(200).json(result);
});

exports.getOrderById = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const result = await orderService.getOrderById({ id: orderId });
  res.status(200).json(result);
});

exports.cancelOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const result = await orderService.cancelOrder({ id: orderId });
  res.status(200).json(result);
});

exports.confirmOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const result = await orderService.confirmlOrder({ id: orderId });
  res.status(200).json(result);
});

exports.completeOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const result = await orderService.completelOrder({ id: orderId });
  res.status(200).json(result);
});

exports.updateShippingStatus = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const { shipping_status } = req.body;
  const result = await orderService.updateShippingStatus({
    id: orderId,
    shipping_status
  });
  res.status(200).json(result);
});

exports.updatePaymentStatus = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const { payment_status } = req.body;
  const result = await orderService.updatePaymentStatus({
    id: orderId,
    payment_status
  });
  res.status(200).json(result);
});
