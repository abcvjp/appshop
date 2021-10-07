const IORedis = require('ioredis');
const config = require('../config');

module.exports = new IORedis({
  host: config.get('redis.host'),
  port: config.get('redis.port'),
  password: config.get('redis.password')
});
