var express = require('express');
var router = express.Router();

const { validate } = require('../helpers/validator.helper');

const paymentValidation = require('../helpers/validations/payment.validation');
const paymentController = require('../controllers/payment.controller');

router.get('/method', paymentController.getPaymentMethods);

router.post(
	'/stripe',
	validate(paymentValidation.doPaymentByStripe),
	paymentController.doPaymentWithStripe
);

router.get('/card-token', paymentController.createCardToken);

module.exports = router;
