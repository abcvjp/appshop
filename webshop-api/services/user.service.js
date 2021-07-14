const User = require('../models').User

const getAll = async () => {
	try {
		const data = await User.findAll()
		return data
	} catch (err) {
		throw err
	}
}

module.exports = {
	getAll
}