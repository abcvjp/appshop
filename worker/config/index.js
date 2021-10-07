var convict = require('convict');

convict.addFormat({
  name: 'array',
  validate: function (children, schema) {
    if (!Array.isArray(children)) {
      throw new Error('must be of type Array');
    }
  }
});

var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  mailer: {
    service: {
      format: String,
      default: 'gmail',
      env: 'MAILER_SERVICE'
    },
    user: {
      format: String,
      default: 'webshoptest4@gmail.com',
      env: 'MAILER_USER'
    },
    password: {
      format: String,
      default: '123456',
      env: 'MAILER_PASSWORD'
    }
  },
  redis: {
    host: {
      format: String,
      default: 'redis',
      env: 'REDIS_HOST'
    },
    port: {
      format: Number,
      default: 6379,
      env: 'REDIS_PORT'
    },
    password: {
      format: String,
      default: '123456',
      env: 'REDIS_PASSWORD'
    }
  }
});

// Load environment dependent configuration
var env = config.get('env');
config.loadFile('./config/' + env + '.json');

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
