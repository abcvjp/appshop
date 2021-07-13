var express = require('express')
var router = express.Router()
const pool = require('../utils/database')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query('select * from user')
    res.send(rows)
  } catch (err) {
    throw err
  }
})

module.exports = router
