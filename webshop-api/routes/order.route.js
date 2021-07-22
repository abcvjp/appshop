var express = require('express')
var router = express.Router()
const orderController = require('../controllers/order.controller')
const orderValidation = require('../helpers/validations/order.validation')
const { validate } = require('express-validation')

router.get('/', orderController.getOrders)
router.post('/', validate(orderValidation.createOrder), orderController.createOrder)
router.get('/:orderId', validate(orderValidation.getOrderById), orderController.getOrderById)
router.put('/:orderId', validate(orderValidation.updateOrderInfo), orderController.updateOrderInfo)
router.delete('/:orderId', validate(orderValidation.deleteOrder), orderController.deleteOrder)
router.get('/:orderId/cancel', validate(orderValidation.cancelOrder), orderController.cancelOrder)
router.get('/:orderId/confirm', validate(orderValidation.confirmOrder), orderController.confirmOrder)
router.get('/:orderId/complete', validate(orderValidation.completeOrder), orderController.completeOrder)
router.put('/:orderId/shipping', validate(orderValidation.updateShippingStatus), orderController.updateShippingStatus)
router.put('/:orderId/payment', validate(orderValidation.updatePaymentStatus), orderController.updatePaymentStatus)

module.exports = router