const config = require('../configs')
const Sequelize = require('sequelize')

const UserModel = require('./user')
const CategoryModel = require('./category')
const OrderModel = require('./order')
const OrderItemModel = require('./order_item')
const PaymentMethodModel = require('./payment_method')
const ShippingMethodModel = require('./shipping_method')
const ProductModel = require('./product')

const dbConfig = config.get('db')
const sequelize = new Sequelize({
	host: dbConfig.host,
	dialect: 'mysql',
	username: dbConfig.username,
	password: dbConfig.password,
	database: dbConfig.name,
	pool: dbConfig.pool
})

const User = UserModel(sequelize, Sequelize)
const Category = CategoryModel(sequelize, Sequelize)
const Product = ProductModel(sequelize, Sequelize)
const Order = OrderModel(sequelize, Sequelize)
const OrderItem = OrderItemModel(sequelize, Sequelize)
const PaymentMethod = PaymentMethodModel(sequelize, Sequelize)
const ShippingMethod = ShippingMethodModel(sequelize, Sequelize)

Category.belongsTo(Category, { foreignKey: 'parent_id' })
OrderItem.belongsTo(Order, { foreignKey: 'order_id' })
Order.belongsTo(PaymentMethod, { foreignKey: 'payment_method_id' })
Order.belongsTo(ShippingMethod, { foreignKey: 'shipping_method_id' })
Product.belongsTo(Category, { foreignKey: 'category_id' })


sequelize.sync()
	.then(() => {
		console.log(`Database & tables created!`)
	})

module.exports = {
	User,
	Category
}