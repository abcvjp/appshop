var express = require('express');
var router = express.Router();


router.use('/user', require('./user.route'))
router.use('/test', require('./test.route'))
router.use('/category', require('./category.route'))

module.exports = router;
