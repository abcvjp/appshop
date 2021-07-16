var express = require('express');
var router = express.Router();


router.use('/user', require('./user.route'))
router.use('/test', require('./test.route'))

module.exports = router;
