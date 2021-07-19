const userService = require('../services/user.service')
const { JWT } = require('../helpers')
const debug = require('debug')
const createError = require('http-errors')
const asyncHandler = require('express-async-handler')

exports.login = asyncHandler(async (req, res, next) => {
	const { username, password } = req.body
	if (!(username && password)) {
		throw createError(400, 'Username or password is not provided')
	}
	const result = await userService.login({ username, password })
	res.status(200).json(result)
})

exports.signup = asyncHandler(async (req, res, next) => {
	const { username, password, email, full_name } = req.body
	const result = await userService.signup({ username, password, email, full_name })
	res.status(200).json(result)
})

exports.logout = asyncHandler(async (req, res, next) => {
})

exports.authenticate = asyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization
	const accessToken = authHeader ? authHeader.split(' ')[1] : null
	if (accessToken) {
		const user = await userService.authenticate({ accessToken })
		req.user = user
		next()
	} else {
		throw createError(401, 'accessToken required')
	}
})

exports.getAll = asyncHandler(async (req, res, next) => {
	const data = await userService.getAll()
	res.json(data)
})

exports.getUserById = asyncHandler(async (req, res, next) => {
	const userId = req.params.userId
	const result = await userService.getUserById({ id: userId })
	res.status(200).json(result)
})
