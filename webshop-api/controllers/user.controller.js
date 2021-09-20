const userService = require('../services/user.service')
const createError = require('http-errors')
const asyncHandler = require('express-async-handler')
const Role = require("../helpers/roles.helper");

exports.login = asyncHandler(async (req, res, next) => {
	const { username, password } = req.body
	const result = await userService.login({ username, password })
	if (result.success) {
		res.cookie('access_token', result.access_token, { httpOnly: true })
		res.cookie('refresh_token', result.refresh_token, { httpOnly: true, path: '/user' })
	}
	res.status(200).json(result)
})

exports.signup = asyncHandler(async (req, res, next) => {
	const { username, password, email, phone_number, full_name } = req.body
	const result = await userService.signup({ username, password, email, phone_number, full_name })
	res.status(200).json(result)
})

exports.logout = asyncHandler(async (req, res, next) => {
	const { user } = req
	if (user) {
		await userService.deleteRefreshToken({ user })
		res.clearCookie('access_token')
		res.clearCookie('refresh_token')
		res.status(200).json({ success: true })
	} else {
		throw createError(409, 'You are not logged in')
	}
})

exports.refreshToken = asyncHandler(async (req, res, next) => {
	const { refresh_token } = req.cookies
	if (refresh_token) {
		const result = await userService.refreshToken({ refresh_token })
		res.cookie('access_token', result.access_token, { httpOnly: true })
		res.cookie('refresh_token', result.refresh_token, { httpOnly: true, path: '/user' })
		res.status(200).json(result)
	} else {
		throw createError(400, 'You do not have refresh token')
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

exports.updateUserInfo = asyncHandler(async (req, res, next) => {
	const userId = req.params.userId
	if (!(req.user.id === userId || req.user.role === Role.Admin)) {
		throw createError(403, "You don't have permission to perform this")
	}
	const { username, full_name, email, phone_number, avatar } = req.body
	const result = await userService.updateUserInfo({ id: userId, username, full_name, email, phone_number, avatar })
	res.status(200).json(result)
})

exports.resetPassword = asyncHandler(async (req, res, next) => {
	const userId = req.params.userId
	if (req.user.id !== userId) {
		throw createError(403, "You don't have permission to perform this")
	}
	const { current_password, new_password } = req.body
	const result = await userService.updateUserInfo({ id: userId, current_password, new_password })
	res.status(200).json(result)
})

exports.authenticate = ({ required }) => asyncHandler(async (req, res, next) => {
	const { access_token } = req.cookies
	if (access_token) {
		const user = await userService.authenticate({ access_token })
		req.user = user ? user : null
		if (required === true && !user) {
			throw createError(403, 'Authentication failed')
		}
	} else if (required === true) {
		throw createError(401, 'You must login to get access')
	}
	next()
})

exports.authorize = (roles = []) => asyncHandler(async (req, res, next) => {
	if (typeof roles === 'string') {
		roles = [roles];
	}
	if (roles.length && !roles.includes(req.user.role)) {
		// user's role is not authorized
		throw createError(403, `You don't have permission to access this`)
	}
	next()
})