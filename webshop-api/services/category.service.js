const Category = require('../models').Category
const createError = require('http-errors')
const slug = require('slug')
const { sequelize, Sequelize } = require('../models')
const { isEmptyArray } = require('../helpers/js.helper')
const { uuid } = require('uuidv4')

exports.getCategories = async () => {
	try {
		const categories = await Category.findAll()
		if (!categories) throw createError(404, "Can not find any category")
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

exports.createCategory = async ({ name, description, parent_id, meta_title, meta_description, meta_keywords }) => {
	try {
		const id = uuid()
		const slugName = slug(name)
		let path = name
		if (parent_id) {
			const parentCategory = await Category.findByPk(parent_id, { attributes: ['path'] })
			path = parentCategory.path + ' - ' + path
		}
		const newCategory = {
			id,
			name,
			description,
			parent_id,
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
				await categoryToUpdate.update({
					name,
					description,
					slug: slugName,
					path: newPath,
					meta_title,
					meta_description,
					meta_keywords
				})

				// update path or relate categories
				await Promise.all(relateCategories.map(async (category) => {
					try {
						await category.update({
							path: category.path.replace(oldName, name)
						})
					} catch (err) {
						throw err
					}
				}))
			})
		}
		return {
			success: true,
			result: categoryToUpdate
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}
exports.deleteCategory = async ({ id }) => {
	try {
		const categoryToUpdate = await Category.findByPk(id)
		if (!categoryToUpdate) throw createError(404, 'Category does not exist')
		await categoryToUpdate.destroy()
		return {
			success: true
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}
