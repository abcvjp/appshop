var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser')
const debug = require('debug')

var mainRouter = require('./routes/index');

var app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'));
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
    error: err.message
  });
});

module.exports = app;
