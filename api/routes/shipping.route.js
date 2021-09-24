var express = require('express');
var router = express.Router();
const shippingController = require('../controllers/shipping.controller');

router.get('/shipping_method', shippingController.getShippingMethods);

module.exports = router;
