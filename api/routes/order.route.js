var express = require('express');
var router = express.Router();
const orderController = require('../controllers/order.controller');
const orderValidation = require('../helpers/validations/order.validation');

const { authenticate, authorize } = require('../controllers/user.controller');
const Role = require('../helpers/roles.helper');
const { validate } = require('../helpers/validator.helper');

router.get(
  '/all',
  authenticate({ required: true }),
  authorize(Role.Admin),
  validate(orderValidation.getOrders),
  orderController.getOrders
);
router.post(
  '/',
  validate(orderValidation.createOrder),
  orderController.createOrder
);
router.get(
  '/:orderId',
  authenticate({ required: true }),
  authorize(Role.Admin),
  validate(orderValidation.getOrderById),
  orderController.getOrderById
);
router.put(
  '/',
  authenticate({ required: true }),
  authorize(Role.Admin),
  validate(orderValidation.updateOrdersStatus),
  orderController.updateOrdersStatus
);
router.put(
  '/:orderId',
  authenticate({ required: true }),
  authorize(Role.Admin),
  validate(orderValidation.updateOrderInfo),
  orderController.updateOrderInfo
);
router.delete(
  '/:orderId',
  authenticate({ required: true }),
  authorize(Role.Admin),
  validate(orderValidation.deleteOrder),
  orderController.deleteOrder
);
router.put(
  '/:orderId/cancel',
  authenticate({ required: true }),
  authorize(Role.Admin),
  validate(orderValidation.cancelOrder),
  orderController.cancelOrder
);
router.put(
  '/:orderId/confirm',
  authenticate({ required: true }),
  authorize(Role.Admin),
  validate(orderValidation.confirmOrder),
  orderController.confirmOrder
);
router.put(
  '/:orderId/complete',
  authenticate({ required: true }),
  authorize(Role.Admin),
  validate(orderValidation.completeOrder),
  orderController.completeOrder
);
router.put(
  '/:orderId/shipping',
  authenticate({ required: true }),
  authorize(Role.Admin),
  validate(orderValidation.updateShippingStatus),
  orderController.updateShippingStatus
);
router.put(
  '/:orderId/payment',
  authenticate({ required: true }),
  authorize(Role.Admin),
  validate(orderValidation.updatePaymentStatus),
  orderController.updatePaymentStatus
);

module.exports = router;
