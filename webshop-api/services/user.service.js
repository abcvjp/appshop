const User = require('../models').User
const createError = require('http-errors')
const { Bcrypt, JWT } = require('../helpers')
const { uuid } = require('uuidv4')

exports.login = async ({ username, password }) => {
	try {
		const user = await User.findOne({ where: { username } })
		if (!user) {
			throw createError(409, "User doesn't exist")
		}
		if (Bcrypt.verifyPassword(password, user.hash)) {
			const tokenId = uuid()
			const accessToken = JWT.generateToken({
				username,
				tokenId
			})
			const refreshToken = JWT.generateRefreshToken({
				username,
				tokenId
			})
			return {
				success: true,
				user: {
					username,
					full_name: user.full_name,
					email: user.email
				},
				accessToken,
				refreshToken
			}
		} else {
			throw createError(401, 'Password is incorrect')
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.signup = async ({ username, password, email, full_name }) => {
	try {
		const userByName = await User.findOne({ where: { username } })
		if (userByName) {
			throw createError(409, 'User already exists')
		}
		const userByEmail = await User.findOne({ where: { email } })
		if (userByEmail) {
			throw createError(409, 'Email already exists')
		}
		const id = uuid()
		const hash = Bcrypt.hashPassword(password)
		await User.create({
			id, username, hash, email, full_name
		})
		return {
			success: true,
			user: {
				username,
				full_name,
				email
			}
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.authenticate = async ({ accessToken }) => {
	try {
		const user = JWT.verifyToken(accessToken)
		if (user) {
			return user
		} else {
			throw createError(401, 'acessToken is not valid')
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.getUserById = async ({ id }) => {
	try {
		const userById = await User.findOne({ where: { id } })
		if (!userById) throw createError(404, "User does not exist")
		return {
			success: true,
			data: userById
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.getAll = async () => {
	try {
		const users = await User.findAll()
		if (!users) throw createError(404, "Can not find any user")
		return {
			success: true,
			data: users
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}