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
  ip: {
    doc: 'The IP address to bind.',
    default: '127.0.0.1',
    env: 'IP_ADDRESS'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 5000,
    env: 'PORT',
    arg: 'port'
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'server1.dev.test'
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'users'
    },
    username: {
      doc: 'Database username',
      format: String,
      default: 'admin'
    },
    password: {
      doc: 'Database password for user',
      format: String,
      sensitive: true,
      default: '123456',
      env: 'DB_PASSWORD'
    },
    pool: {
      max: {
        format: Number,
        default: 10
      },
      min: {
        format: Number,
        default: 0
      },
      acquire: {
        format: Number,
        default: 30000
      },
      idle: {
        format: Number,
        default: 10000
      }
    }
  },
  sequelize: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'server1.dev.test'
    },
    database: {
      doc: 'Database name',
      format: String,
      default: 'users'
    },
    username: {
      doc: 'Database username',
      format: String,
      default: 'admin'
    },
    password: {
      doc: 'Database password for user',
      format: String,
      sensitive: true,
      default: '123456',
      env: 'DB_PASSWORD'
    },
    dialect: {
      doc: 'Database type',
      format: String,
      default: 'mysql'
    },
    ssl: {
      format: Boolean,
      default: false,
      nullable: true
    },
    dialectOptions: {
      ssl: {
        require: {
          format: Boolean,
          default: false
        }
      },
      decimalNumbers: {
        format: Boolean,
        default: true
      }
    }
  },
  cors: {
    whiteList: {
      format: 'array',
      default: []
    },
    credentials: {
      format: Boolean,
      default: false
    }
  },
  jwt: {
    secret: {
      format: String,
      default: 'Ysg$fG&DG'
    },
    secret_options: {
      expiresIn: {
        format: String,
        default: '3d'
      }
    },
    refresh_secret: {
      format: String,
      default: 'Ysg$fG&DG'
    },
    refresh_secret_options: {
      expiresIn: {
        format: String,
        default: '10d'
      }
    }
  },
  admins: {
    doc: 'Users with write access, or null to grant full access without login.',
    format: Array,
    nullable: true,
    default: null
  }
});

// Load environment dependent configuration
var env = config.get('env');
config.loadFile('./config/' + env + '.json');

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;