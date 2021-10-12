const config = require('../config');
const options = {
  host: config.get('mailhog.host'),
  port: config.get('mailhog.port')
};
module.exports = require('mailhog')(options);
