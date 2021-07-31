var express = require('express');
var router = express.Router();


router.use('/user', require('./user.route'))
router.use('/test', require('./test.route'))
router.use('/category', require('./category.route'))
router.use('/product', require('./product.route'))
router.use('/order', require('./order.route'))
router.use('/cart', require('./cart.route'))
router.use('/shipping', require('./shipping.route'))
router.use('/payment', require('./payment.route'))

module.exports = router;
