const jwt = require('jsonwebtoken')
const config = require('../config')

const generateToken = (data) => {
	return jwt.sign(data, config.get('jwt.secret'), config.get('jwt.secret_options'))
}

const generateRefreshToken = (data) => {
	return jwt.sign(data, config.get('jwt.refresh_secret'))
}

const verifyToken = (token) => {
	return jwt.verify(token, config.get('jwt.secret'))
}

const verifyRefreshToken = (token) => {
	return jwt.verify(token, config.get('jwt.refresh_secret_options'))
}

module.exports = {
	generateToken,
	verifyToken,
	generateRefreshToken,
	verifyRefreshToken
}