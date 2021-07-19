var logger = require('morgan')

logger.token('req-params', function (req, res) {
	return JSON.stringify(req.params)
})
logger.token('req-body', function (req, res) {
	return JSON.stringify(req.body)
})

module.exports = logger('> :method :url\n> Params\: :req-params\n> Body\: :req-body\n> :status - :response-time ms')


