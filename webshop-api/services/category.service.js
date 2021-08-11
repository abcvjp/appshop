const Category = require('../models').Category
const createError = require('http-errors')
const slug = require('slug')
const { sequelize, Sequelize } = require('../models')
const { isEmptyArray } = require('../helpers/js.helper')
const { uuid } = require('uuidv4')
const { calculateLimitAndOffset, paginate } = require('paginate-info')

exports.getCategories = async ({current_page, page_size, sort}) => {
	try {
		const { limit, offset } = calculateLimitAndOffset(current_page, page_size)
		const {rows, count} = await Category.findAndCountAll({
			limit, offset,
			order: sort ? [sort.split('.')] : [['createdAt', 'DESC']]
		})
		if (rows.length < 1) throw createError(404, "Can not find any category")
		const pagination = paginate(current_page, count, rows, page_size)
		return {
			success: true,
			data: rows,
			pagination
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.getCategoryById = async ({ id, include_products, include_childs }) => {
	try {
		const temp = []
		if (include_products) {
			temp.push({ association: 'products' })
		}
		if (include_childs) {
			temp.push({ association: 'childs' })
		}
		const category = await Category.findByPk(id, {
			include: temp
		})
		if (!category) throw createError(404, "Category does not exist")
		return {
			success: true,
			data: category
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.getCategoryBySlug = async ({ slug, include_products, include_childs }) => {
	try {
		const temp = []
		if (include_products) {
			temp.push({ association: 'products' })
		}
		if (include_childs) {
			temp.push({ association: 'childs' })
		}
		const category = await Category.findOne({
			where: {
				slug
			},
			include: temp
		})
		if (!category) throw createError(404, "Category does not exist")
		return {
			success: true,
			data: category
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.createCategory = async ({ name, description, parent_id, published, meta_title, meta_description, meta_keywords }) => {
	try {
		const checkExist = await Category.findOne({
			where: {
				name
			}
		})
		if (checkExist) {
			throw createError(409, `Category ${name} is already exist`)
		}
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
			published,
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
exports.updateCategory = async ({ id, name, description, published, meta_title, meta_description, meta_keywords }) => {
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
				published,
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
					published,
					slug: slugName,
					path: newPath,
					meta_title,
					meta_description,
					meta_keywords
				})

				// update path or relate categories
				await Promise.all(relateCategories.map((category) => {
					return category.update({
						path: category.path.replace(oldName, name)
					})
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
		const categoryToDelete = await Category.findByPk(id)
		if (!categoryToDelete) throw createError(404, 'Category does not exist')
		await categoryToDelete.destroy()
		return {
			success: true
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.deleteCategories = async ({ categoryIds }) => {
	try {
		const categoriesToDelete = await Category.findAll({
			where: {
				id: {
					[Sequelize.Op.in]: categoryIds
				}
			}
		})
		if (!categoriesToDelete) throw createError(404, 'One or more category does not exist')
		await sequelize.transaction(async (t) => {
			await Promise.all(categoriesToDelete.map(category => {
				return category.destroy()
			}))
		})
		return {
			success: true
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}