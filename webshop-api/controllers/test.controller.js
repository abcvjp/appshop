const testService = require('../services/test.service')

const getAll = async (req, res, next) => {
	try {
		console.log(req.body)
		const data = { name: 'hoaideptrai' }
		res.json(data)
	} catch (err) {
		next(err)
	}
}

module.exports = {
	getAll
}