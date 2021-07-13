module.exports = (sequelize, Sequelize) => {
	const OrderItem = sequelize.define('order_item', {
		id: {
			type: Sequelize.DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		price: {
			type: Sequelize.DataTypes.DOUBLE,
			allowNull: false
		},
		quantity: {
			type: Sequelize.DataTypes.INTEGER,
			allowNull: false
		}
	})

	return OrderItem
}