const User = require('../models').User
const createError = require('http-errors')
const { Bcrypt, JWT } = require('../helpers')
const { uuid } = require('uuidv4')

const login = async ({ username, password }) => {
	try {
		const user = await User.findOne({ where: { username } })
		if (!user) {
			throw createError(409, "User doesn't exists")
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
			return { success: true, username, email: user.email, accessToken, refreshToken }
		} else {
			throw createError(401, 'Password is incorrect')
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

const signup = async ({ username, password, email, fullname }) => {
	try {
		const userByName = await User.findOne({ where: { username } })
		if (userByName) {
			throw createError(409, 'User already exists')
		}
		const userByEmail = await User.findOne({ where: { email } })
		if (userByEmail) {
			throw createError(409, 'Email already exists')
		}

		const hash = Bcrypt.hashPassword(password)
		await User.create({
			username, hash, email, full_name: fullname
		})
		return {
			success: true,
			username,
			fullname,
			email
		}
	} catch (err) {
		throw err
	}
}

const authenticate = async ({ accessToken }) => {
	try {
		const user = JWT.verifyToken(accessToken)
		if (user) {
			return user
		} else {
			throw createError(401, 'acessToken is not valid')
		}
	} catch (error) {
		throw error
	}
}

const getOneByName = async ({ username }) => {
	try {
		const userByName = await User.findOne({ where: { username } })
		return {
			success: true,
			data: userByName
		}
	} catch (err) {
		throw err
	}
}

const getAll = async () => {
	try {
		const users = await User.findAll()
		console.log(users)
		return {
			success: true,
			data: users
		}
	} catch (err) {
		throw err
	}
}

module.exports = {
	getAll,
	login,
	signup,
	authenticate,
	getOneByName
}