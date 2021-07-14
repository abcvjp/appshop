const userService = require('../services/user.service')

const getAll = async (req, res, next) => {
	try {
		const data = await userService.getAll()
		res.json(data)
	} catch (err) {
		next(err)
	}
}

module.exports = {
	getAll
}