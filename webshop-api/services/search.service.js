const Product = require('../models').Product
const { Sequelize, sequelize } = require('../models')
const createError = require('http-errors')
const { calculateLimitAndOffset, paginate } = require('paginate-info')

exports.searchProducts = async ({ keyword, category_id, current_page, page_size, sort, enable, published, in_stock }) => {
	try {
		const { limit, offset } = calculateLimitAndOffset(current_page, page_size)
		if (category_id !== undefined) {
			const rows = await sequelize.query(`
				WITH RECURSIVE cte (id, name, slug, parent_id) AS
				(
					SELECT id, name, parent_id, slug FROM Categories WHERE id = '${category_id}'
					UNION
					SELECT c.id, c.name, c.parent_id, c.slug FROM Categories c INNER JOIN cte ON c.parent_id = cte.id
				)
				SELECT p.id, p.name, p.enable, p.published, p.title, p.price, p.root_price, p.quantity, p.sold,
					p.short_description, p.description, p.images, p.slug, p.meta_title, p.meta_keywords, p.meta_description,
					p.createdAt, p.updatedAt, cte.id as 'category.id', cte.name as 'category.name', cte.slug as 'category.slug',
					MATCH (p.name,p.title,p.meta_keywords) AGAINST ('${keyword}' IN NATURAL LANGUAGE MODE) as relevance
				FROM Products p INNER JOIN cte ON p.category_id = cte.id
				WHERE
					${published !== undefined ? `p.enable = ${published ? 1 : 0}` : '1=1'}
					AND ${enable !== undefined ? `p.enable = ${enable ? 1 : 0}` : '1=1'}
					AND ${in_stock !== undefined ? `p.quantity ${in_stock ? `${'> 0'}` : `${' = 0'}`}` : '1=1'}
					AND MATCH (p.name,p.title,p.meta_keywords) AGAINST ('${keyword}' IN NATURAL LANGUAGE MODE)
				ORDER BY ${sort ? sort.replace('.', ' ') : 'relevance DESC'};
			`, {nest: true})
			var count = rows.length
			var result = rows.slice(offset, offset + limit)
		} else {
			const rows = await sequelize.query(`
				SELECT p.id, p.name, p.enable, p.published, p.title, p.price, p.root_price, p.quantity, p.sold,
					p.short_description, p.description, p.images, p.slug, p.meta_title, p.meta_keywords, p.meta_description,
					p.createdAt, p.updatedAt,
					c.name as 'cateogory.name', c.id as 'category.id', c.name as 'category.name', c.slug as 'category.slug',
					MATCH (p.name,p.title,p.meta_keywords) AGAINST ('${keyword}' IN NATURAL LANGUAGE MODE) as relevance
				FROM Products p INNER JOIN Categories c ON p.category_id = c.id
				WHERE
					${published !== undefined ? `p.enable = ${published ? 1 : 0}` : '1=1'}
					AND ${enable !== undefined ? `p.enable = ${enable ? 1 : 0}` : '1=1'}
					AND ${in_stock !== undefined ? `p.quantity ${in_stock ? `${'> 0'}` : `${' = 0'}`}` : '1=1'}
					AND MATCH (p.name,p.title,p.meta_keywords) AGAINST ('${keyword}' IN NATURAL LANGUAGE MODE)
				ORDER BY ${sort ? sort.replace('.', ' ') : 'relevance DESC'};
			`, {nest: true})
			var count = rows.length
			var result = rows.slice(offset, offset + limit)
		}
		if (result.length < 1) throw createError(404, `No result found`)
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