var createError = require('http-errors');
var express = require('express');
var path = require('path');

const config = require('./config')

const cors = require('cors');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const boolParser = require('express-query-boolean');

const { httpLogger, errorHandler } = require('./helpers');

var mainRouter = require('./routes/index');
const morgan = require('morgan');

var app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./docs');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(cors({
  origin: config.get('cors.whiteList'),
  credentials: config.get('cors.credentials')
}))
app.use(bodyParser.json());
app.use(boolParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(httpLogger);

app.use('/', mainRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
