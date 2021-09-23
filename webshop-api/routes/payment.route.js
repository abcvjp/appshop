var express = require('express');
var router = express.Router();
const paymentController = require('../controllers/payment.controller');

router.get('/payment_method', paymentController.getPaymentMethods);

module.exports = router;
