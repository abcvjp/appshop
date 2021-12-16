var express = require('express');
var router = express.Router();
const orderController = require('../controllers/order.controller');
const orderValidation = require('../helpers/validations/order.validation');

const { authenticate, authorizeRole, authorizationController } = require('../controllers/auth.controller');
const Role = require('../helpers/roles.helper');
const { validate } = require('../helpers/validator.helper');

router.get(
  '/all',
  validate(orderValidation.getOrders),
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  orderController.getOrders
);
router.get(
  '/by-user/:userId',
  validate(orderValidation.getOrdersByUserId),
  authenticate({ required: true }),
  authorizationController.getOrdersByUserId,
  orderController.getOrdersByUserId
);
router.post(
  '/',
  validate(orderValidation.createOrder),
  orderController.createOrder
);
router.get(
  '/:orderId',
  validate(orderValidation.getOrderById),
  authenticate({ required: true }),
  authorizationController.getOrderById,
  orderController.getOrderById
);
router.put(
  '/',
  validate(orderValidation.updateOrdersStatus),
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  orderController.updateOrdersStatus
);
router.put(
  '/:orderId',
  validate(orderValidation.updateOrderInfo),
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  orderController.updateOrderInfo
);
router.delete(
  '/:orderId',
  validate(orderValidation.deleteOrder),
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  orderController.deleteOrder
);
router.put(
  '/:orderId/cancel',
  validate(orderValidation.cancelOrder),
  authenticate({ required: true }),
  authorizationController.cancelOrder,
  orderController.cancelOrder
);
router.put(
  '/:orderId/confirm',
  validate(orderValidation.confirmOrder),
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  orderController.confirmOrder
);
router.put(
  '/:orderId/complete',
  validate(orderValidation.completeOrder),
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  orderController.completeOrder
);
router.put(
  '/:orderId/shipping',
  validate(orderValidation.updateShippingStatus),
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  orderController.updateShippingStatus
);
router.put(
  '/:orderId/payment',
  validate(orderValidation.updatePaymentStatus),
  authenticate({ required: true }),
  authorizeRole(Role.Admin),
  orderController.updatePaymentStatus
);

module.exports = router;
