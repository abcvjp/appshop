const { Order, Product, OrderItem, ShippingMethod, PaymentMethod } = require('../models')
const { sequelize, Sequelize } = require('../models')
const createError = require('http-errors')
const slug = require('slug')
const { uuid } = require('uuidv4')
const { calculateLimitAndOffset, paginate } = require('paginate-info')

exports.reportOrders = async ({start_date, end_date, group_by, current_page, page_size, sort}) => {
	try {
		const where = {}
		if (start_date) {
			if (!end_date) {
				where['createdAt'] = {
					[Sequelize.Op.gte]: start_date
				}
			} else {
				where['createdAt'] = {
					[Sequelize.Op.between]: [start_date, end_date]
				}
			}
		} else if (end_date) {
			where['createdAt'] = {
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
		const { rows, count } = await Order.findAndCountAll({
			where,
			include: [
				{
					association: 'order_items',
					attributes: ['price', 'quantity']
				}
			],
			attributes: [
        [Sequelize.literal(timeAttribute), 'time'],
        [Sequelize.literal(`COUNT(DISTINCT(id))`), 'orders_number']
    	],
			group: ['time'],
			limit, offset,
			order: sort ? [sort.split('.')] : [['createdAt','DESC']]
		})
		if (rows.length === 0) throw createError(404, "Can't find any order")
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