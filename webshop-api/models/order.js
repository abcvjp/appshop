
module.exports = (sequelize, Sequelize) => {
	const Order = sequelize.define("order", {
		id: {
			type: Sequelize.DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		status: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
			default: "Chờ xác nhận"
		},
		cost: {
			type: Sequelize.DataTypes.DOUBLE,
			allowNull: false
		},
		payment_status: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
			default: "Chưa thanh toán"
		},
		shipping_status: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
			default: "Chưa vận chuyển"
		},
		customer_name: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.DataTypes.STRING,
			allowNull: true
		},
		phone_number: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		},
		shipping_note: {
			type: Sequelize.DataTypes.STRING,
			allowNull: true
		},
	})

	return Order
}