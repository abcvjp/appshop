const Product = require('../models').Product
const Category = require('../models').Category
const { sequelize } = require('../models')
const createError = require('http-errors')
const slug = require('slug')
const { uuid } = require('uuidv4')
const { calculateLimitAndOffset, paginate } = require('paginate-info')
const { isEmptyArray } = require('../helpers/js.helper')

exports.getProducts = async ({ current_page, page_size, sort, category_id, category_slug }) => {
	try {
		const { limit, offset } = calculateLimitAndOffset(current_page, page_size)
		if (category_id !== undefined) {
			const [rows] = await sequelize.query(`
				WITH RECURSIVE cte (id, name, parent_id) AS
				(
					SELECT id, name, parent_id FROM Categories WHERE id = '${category_id}'
					UNION
					SELECT c.id, c.name, c.parent_id FROM Categories c INNER JOIN cte ON c.parent_id = cte.id
				)
				SELECT p.* FROM Products p INNER JOIN cte ON p.category_id = cte.id
					ORDER BY ${sort ? sort.replace('.', ' ') : 'createdAt DESC'}
			`)
			var count = rows.length
			var result = rows.slice(offset, offset + limit)
		} else if (category_slug !== undefined) {
			const [rows] = await sequelize.query(`
				WITH RECURSIVE cte (id, name, parent_id) AS
				(
					SELECT id, name, parent_id FROM Categories WHERE slug = '${category_slug}'
					UNION
					SELECT c.id, c.name, c.parent_id FROM Categories c INNER JOIN cte ON c.parent_id = cte.id
				)
				SELECT p.* FROM Products p INNER JOIN cte ON p.category_id = cte.id
					ORDER BY ${sort ? sort.replace('.', ' ') : 'createdAt DESC'};
			`)
			var count = rows.length
			var result = rows.slice(offset, offset + limit)
		} else {
			var { rows, count } = await Product.findAndCountAll({
				limit, offset,
				order: sort ? [sort.split('.')] : ['createdAt']
			})
			var result = rows
		}
		if (result.length < 1) throw createError(404, "Can't find any product")
		const pagination = paginate(current_page, count, result, page_size)
		return {
			success: true,
			data: result,
			pagination
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.getProductBySlug = async ({ slug }) => {
	try {
		const productBySlug = await Product.findOne({
			where: { slug },
			include: {
				association: 'category',
				required: true,
				attributes: ['id', 'name', 'path', 'slug']
			}
		})
		if (!productBySlug) throw createError(404, 'Product does not exist')
		return {
			success: true,
			data: productBySlug
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.getProductById = async ({ id }) => {
	try {
		const productById = await Product.findByPk(id)
		if (!productById) throw createError(404, 'Product does not exist')
		return {
			success: true,
			data: productById
		}
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.createProduct = async ({ enable, name, title, price, quantity, discount, short_description, description, images, meta_title,
	meta_description, meta_keywords, category_id }) => {
	try {
		const id = uuid()
		const slugName = slug(name)
		const newProduct = await Product.create({
			id,
			enable,
			name,
			title,
			price,
			quantity,
			discount,
			short_description,
			description,
			images,
			slug: slugName,
			meta_title,
			meta_description,
			meta_keywords,
			category_id
		})
		return { success: true, result: newProduct }
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.updateProduct = async ({ id, enable, name, title, price, quantity, discount, short_description, description,
	images, meta_title, meta_description, meta_keywords }) => {
	try {
		const productToUpdate = await Product.findByPk(id)
		if (!productToUpdate) throw createError(404, 'Product does not exist')
		if (productToUpdate.name !== name) {
			var slugName = slug(name)
		}
		await productToUpdate.update({
			enable,
			name,
			title,
			price,
			quantity,
			discount,
			short_description,
			description,
			slug: slugName,
			images,
			meta_title,
			meta_description,
			meta_keywords
		})
		return { success: true, result: productToUpdate }
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}

exports.deleteProduct = async ({ id }) => {
	try {
		const productToDelete = await Product.findByPk(id)
		if (!productToDelete) throw createError(404, 'Product does not exist')
		await productToDelete.destroy()
		return { success: true }
	} catch (error) {
		throw createError(error.statusCode || 500, error.message)
	}
}