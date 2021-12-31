const createError = require('http-errors');
const { ResourceType } = require('../helpers');

const { User } = require('../models');

const { JWT } = require('../helpers');

exports.checkPermissionByRole = async ({ user, roles = [] }) => {
	try {
		if (typeof roles === 'string') {
			roles = [roles];
		}

		if (roles.length && !roles.includes(user.role)) {
			return false;
		}
		return true;
	} catch (error) {
    	throw createError(error.statusCode || 500, error.message);
	}
}

exports.checkPermissionByOwnership = async ({ user, resourceId, resourceType }) => {
	try {
		if (resourceType.name === ResourceType.User.name) {
			if (user.id !== resourceId) {
				return false;
			} else {
				return true;
			}
		} else {
			const resourceModel = resourceType.model;
			const resourceFromServer = await resourceModel.findByPk(resourceId, {
				attributes: ['user_id']
			});
			if (!resourceFromServer) {
				throw createError(500, 'checkPermissionByOwnership error: resource does not exist');
			}
			if (resourceFromServer.user_id === undefined) {
				throw createError(500, 'checkPermissionByOwnership error: resource type does not have ownership with user type');
			}

			if (resourceFromServer.user_id !== user.id) {
				return false;
			}
			
			return true;
		}

	} catch (error) {
    	throw createError(error.statusCode || 500, error.message);
	}
}

exports.authenticate = async ({ access_token }) => {
    try {
        const userFromToken = JWT.verifyAccessToken(access_token);
        if (userFromToken) {
            const userFromDb = await User.findByPk(userFromToken.id);
            return userFromDb;
        } else {
            throw createError(401, 'Acess token is invalid');
        }
    } catch (error) {
        throw createError(error.statusCode || 500, error.message);
    }
};