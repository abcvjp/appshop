const Category = require('../models').Category
const createError = require('http-errors')
const slug = require('slug')
const { sequelize, Sequelize } = require('../models')
const { isEmptyArray } = require('../helpers/js.helper')

exports.getCategories = async () => {
	try {
		const categories = await Category.findAll()
		if (!category) throw createError(404, "Can not find any category")
		return {
			success: true,
			data: categories
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.getCategoryById = async ({ id }) => {
	try {
		const category = await Category.findByPk(id)
		if (!category) throw createError(404, "Category does not exist")
		return {
			success: true,
			data: category
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.createCategory = async ({ name, description, parentId, meta_title, meta_description, meta_keywords }) => {
	try {
		const slugName = slug(name)
		let path = name
		if (parentId) {
			const parentCategory = await Category.findByPk(parentId, { attributes: ['path'] })
			path = parentCategory.path + ' - ' + path
		}
		const newCategory = {
			name,
			description,
			parent_id: parentId,
			slug: slugName,
			path,
			meta_title,
			meta_description,
			meta_keywords
		}
		await Category.create(newCategory)
		return {
			success: true,
			result: newCategory
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}
exports.updateCategory = async ({ id, name, description, meta_title, meta_description, meta_keywords }) => {
	try {
		// find category to be updated
		const categoryToUpdate = await Category.findByPk(id)
		if (!categoryToUpdate) {
			throw createError(409, "Category doesn't exist")
		}

		let relateCategories
		const oldName = categoryToUpdate.name
		if (name !== oldName) {
			var newPath = categoryToUpdate.path.replace(oldName, name)
			var slugName = slug(name)

			// find other categories that have relationship to our category
			relateCategories = await Category.findAll({
				where: {
					[Sequelize.Op.or]: [
						{
							path: {
								[Sequelize.Op.like]: '% - ' + oldName + ' - %'
							}
						},
						{
							path: {
								[Sequelize.Op.like]: '%' + oldName + ' - %'
							}
						},
						{
							path: {
								[Sequelize.Op.like]: '% - ' + oldName + '%'
							}
						}
					]
				}
			})
		}

		if (isEmptyArray(relateCategories)) {
			result = await categoryToUpdate.update({
				name,
				description,
				slug: slugName,
				path: newPath,
				meta_title,
				meta_description,
				meta_keywords
			})
		} else {
			await sequelize.transaction(async (t) => {
				// update path or relate categories
				await Promise.all(relateCategories.map(async (category) => {
					await category.update({
						path: category.path.replace(oldName, name)
					})
				}))

				await categoryToUpdate.update({
					name,
					description,
					slug: slugName,
					path: newPath,
					meta_title,
					meta_description,
					meta_keywords
				})
			})
		}
		return {
			success: true
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}
exports.deleteCategory = async ({ categoryId }) => {
	try {
		await Category.destroy({
			where: {
				id: categoryId
			}
		})
		return {
			success: true
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}
