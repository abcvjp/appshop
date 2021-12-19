const createError = require('http-errors');
const { ResourceType } = require('../helpers');

const { User } = require('../models');

exports.checkPermissionByRole = async ({ user, roles = [] }) => {
	try {
		if (!user) throw createError(500, 'checkPermissionByRole error: user is null');

		const userFromServer = await User.findByPk(user.id, { attributes: ['role'] });
		if (!userFromServer) {
			throw createError(409, 'Your user is not exist')
		}
		if (roles.length && !roles.includes(userFromServer.role)) {
			return false;
		}
		return true;
	} catch (error) {
    	throw createError(error.statusCode || 500, error.message);
	}
}

exports.checkPermissionByOwnership = async ({ user, resourceId, resourceType }) => {
	try {
		if (!user) throw createError(500, 'checkPermissionByOwnership error: user is null');
		if (resourceType.name === ResourceType.User.name) {
			if (user.id !== resourceId) {
				throw createError(403, `You don't have permission to access this`);
			} else {
				return true;
			}
		} else {
			const resourceModel = resourceType.model;
			const resourceFromServer = await resourceModel.findByPk(resourceId);
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