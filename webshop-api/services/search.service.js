const Product = require('../models').Product
const { Sequelize, sequelize } = require('../models')
const createError = require('http-errors')
const { calculateLimitAndOffset, paginate } = require('paginate-info')

exports.searchProducts = async ({ keyword, category_id, current_page, page_size, sort }) => {
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
				SELECT p.*, MATCH (p.name,p.title,p.meta_keywords) AGAINST ('${keyword}' IN NATURAL LANGUAGE MODE) as relevance
					FROM Products p INNER JOIN cte ON p.category_id = cte.id
					WHERE p.enable = 1 AND MATCH (p.name,p.title,p.meta_keywords) AGAINST ('${keyword}' IN NATURAL LANGUAGE MODE)
					ORDER BY ${sort ? sort.replace('.', ' ') : 'relevance DESC'};
			`)
			var count = rows.length
			var result = rows.slice(offset, offset + limit)
		} else {
			const [rows] = await sequelize.query(`
				SELECT *, MATCH (name,title,meta_keywords) AGAINST ('${keyword}' IN NATURAL LANGUAGE MODE) as relevance
					FROM Products
					WHERE enable = 1 AND MATCH (name,title,meta_keywords) AGAINST ('${keyword}' IN BOOLEAN MODE)
					ORDER BY ${sort ? sort.replace('.', ' ') : 'relevance DESC'};
			`)
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