const { createLogger, format, transports, config } = require('winston');

const options = {
  combinedFile: {
    format: format.combine(
      format.timestamp(),
      format.json()
    ),
    filename: './logs/combined.log',
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  errorFile: {
    level: 'error',
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json()
    ),
    filename: './logs/error.log',
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'info',
    format: format.combine(
      format.label({ label: 'DEBUG LOG' }),
      format.timestamp(),
      format.printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
      }),
      format.colorize({ all: true })
    ),
    handleExceptions: true,
    json: false,
    colorize: true,
  }
}

const logTransports = [
  new transports.File(options.combinedFile),
  new transports.File(options.errorFile)
]

if (process.env.NODE_ENV !== 'production') {
  logTransports.push(new transports.Console(options.console))
}

const logger = createLogger({
  levels: config.npm.levels,
  transports: logTransports,
  exitOnError: false
})

module.exports = logger