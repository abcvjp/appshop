const { OrderReport } = require('../models')
const { sequelize, Sequelize } = require('../models')
const createError = require('http-errors')
const moment = require('moment')
const { calculateLimitAndOffset, paginate } = require('paginate-info')

exports.getOrderReport = async ({start_date, end_date, group_by, current_page, page_size, sort}) => {
	try {
		const where = {}
		if (start_date) {
			if (!end_date) {
				where['day'] = {
					[Sequelize.Op.gte]: start_date
				}
			} else {
				where['day'] = {
					[Sequelize.Op.between]: [start_date, end_date]
				}
			}
		} else if (end_date) {
			where['day'] = {
				[Sequelize.Op.lte]: end_date
			}
		}

		let timeAttribute = ''
		if (group_by === 'day') {
			timeAttribute = 'DATE(createdAt)'
		} else if (group_by === 'week') {
			timeAttribute = 'CONCAT(YEAR(createdAt), '/', WEEK(createdAt))'
		} else if (group_by === 'month') {
			timeAttribute === 'MONTH(createdAt)'
		} else if (group_by === 'year') {
			timeAttribute === 'YEAR(createdAt)'
		}

		const { limit, offset } = calculateLimitAndOffset(current_page, page_size)
		const rows = await OrderReport.findAll({
			where,
			attributes: [
        [Sequelize.literal(timeAttribute), 'time'],
				[Sequelize.fn('SUM',Sequelize.col('orders_number')),'orders_number'],
				[Sequelize.fn('SUM',Sequelize.col('item_total')),'item_total'],
				[Sequelize.fn('SUM',Sequelize.col('items_number')),'items_number'],
				[Sequelize.fn('SUM',Sequelize.col('shipping_fee')),'shipping_fee'],
				[Sequelize.fn('SUM',Sequelize.col('order_total')),'order_total'],
				[Sequelize.fn('SUM',Sequelize.col('profit')),'profit']
    	],
			group: ['time'],
			limit, offset,
			order: sort ? [sort.split('.')] : [[Sequelize.literal('time'),'DESC']]
		})
		const count = rows.length
		if (rows.length === 0) throw createError(404, "Can't find any order report")
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