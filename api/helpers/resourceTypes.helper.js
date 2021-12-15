const {
	Product,
	Category,
	Order,
	User
} = require('../models')

module.exports = {
	Product: {
		name: 'Product',
		model: Product
	},
	Category: {
		name: 'Category',
		model: Category
	},
	Order: {
		name: 'Order',
		model: Order
	},
	User: {
		name: 'User',
		model: User
	},
	Cart: {
		name: 'Cart'
	}
}