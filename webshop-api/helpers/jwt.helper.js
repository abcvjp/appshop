const jwt = require('jsonwebtoken')
const config = require('../config')

const generateAccessToken = (data) => {
	return jwt.sign(data, config.get('jwt.secret'), config.get('jwt.secret_options'))
}

const generateRefreshToken = (data) => {
	return jwt.sign(data, config.get('jwt.refresh_secret'), config.get('jwt.refresh_secret_options'))
}

const verifyAccessToken = (token) => {
	return jwt.verify(token, config.get('jwt.secret'))
}

const verifyRefreshToken = (token) => {
	return jwt.verify(token, config.get('jwt.refresh_secret'))
}

module.exports = {
	generateAccessToken,
	verifyAccessToken,
	generateRefreshToken,
	verifyRefreshToken
}