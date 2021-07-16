const userService = require('../services/user.service')
const { JWT } = require('../helpers')
const debug = require('debug')
const createError = require('http-errors')

const login = async (req, res, next) => {
	try {
		const { username, password } = req.body
		if (!(username && password)) {
			throw createError(400, 'Username or password is not provided')
		}
		const result = await userService.login({ username, password })
		res.status(200).json(result)
	} catch (error) {
		next(error)
	}
}

const signup = async (req, res, next) => {
	try {
		const { username, password, email, fullname } = req.body
		const result = await userService.signup({ username, password, email, fullname })
		res.status(200).json(result)
	} catch (error) {
		next(error)
	}
}

const logout = async (req, res, next) => {
	try {

	} catch (error) {
		next(error)
	}
}

const authenticate = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization
		const accessToken = authHeader ? authHeader.split(' ')[1] : null
		if (accessToken) {
			const user = await userService.authenticate({ accessToken })
			req.user = user
			next()
		} else {
			throw createError(401, 'accessToken required')
		}
	} catch (error) {
		next(error)
	}
}

const getAll = async (req, res, next) => {
	try {
		const data = await userService.getAll()
		res.json(data)
	} catch (err) {
		next(err)
	}
}

const getOneByName = async (req, res, next) => {
	try {
		const username = req.params.username
		const result = await userService.getOneByName({ username })
		res.status(200).json(result)
	} catch (error) {
		debug(error)
		next(error)
	}
}
module.exports = {
	login,
	signup,
	logout,
	authenticate,
	getAll,
	getOneByName
}