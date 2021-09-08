const cancelOrder = require("./operations/cancelOrder");
const completeOrder = require("./operations/completeOrder");
const confirmOrder = require("./operations/confirmOrder");
const createOrder = require("./operations/createOrder");
const deleteOrder = require("./operations/deleteOrder");
const getOrderById = require("./operations/getOrderById");
const getOrders = require("./operations/getOrders");
const updateOrder = require("./operations/updateOrder");
const updateOrdersStatus = require("./operations/updateOrdersStatus");

module.exports = {
  "/order/{orderId}": {
    get: getOrderById,
    put: updateOrder,
    delete: deleteOrder,
  },
  "/order/all": {
    get: getOrders,
  },
  order: {
    post: createOrder,
    put: updateOrdersStatus,
  },
  "/order/{orderId}/confirm": {
    get: confirmOrder,
  },
  "/order/{orderId}/complete": {
    get: completeOrder,
  },
  "/order/{orderId}/cancel": {
    get: cancelOrder,
  },
};
