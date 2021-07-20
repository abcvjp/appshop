var express = require('express')
var router = express.Router()
const orderController = require('../controllers/order.controller')
const orderValidation = require('../helpers/validations/order.validation')
const { validate } = require('express-validation')
const order = require('../models/order')

router.get('/', orderController.getOrders)
router.post('/', validate(orderValidation.createOrder), orderController.createOrder)
router.get('/:orderId', validate(orderValidation.getOrderById), orderController.getOrderById)
router.put('/:orderId', validate(orderValidation.updateOrder), orderController.updateOrder)
router.delete('/:orderId', validate(orderValidation.deleteOrder), orderController.deleteOrder)
router.get('/:orderId/cancel', orderController.cancelOrder)
router.get('/:orderId/confirm', orderController.confirmOrder)
router.get('/:orderId/complete', orderController.completeOrder)

module.exports = router