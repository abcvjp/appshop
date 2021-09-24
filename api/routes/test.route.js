var express = require('express');
var router = express.Router();
const testController = require('../controllers/test.controller');

router.get('/', testController.getAll);

module.exports = router;
