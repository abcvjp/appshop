var createError = require('http-errors');
var express = require('express');
var path = require('path');

const config = require('./config')

const cors = require('cors');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const boolParser = require('express-query-boolean');
const logger = require('./helpers/logger.helper');

var mainRouter = require('./routes/index');
const morgan = require('morgan');

var app = express();

app.use(cors({
  origin: config.get('cors.whiteList'),
  credentials: config.get('cors.credentials')
}))
app.use(bodyParser.json())
app.use(boolParser())

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
// next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // debug(err)
  console.log(err.stack)
  res.status(err.status || 500);
  res.json({
    success: false,
    error: {
      message: err.message,
      details: err.details
    }
  });
});

module.exports = app;
