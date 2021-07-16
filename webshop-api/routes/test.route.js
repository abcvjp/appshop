var express = require('express')
var router = express.Router()
const testMiddleware = require('../middlewares/test.middleware')

router.get('/', testMiddleware.getAll)


module.exports = router
