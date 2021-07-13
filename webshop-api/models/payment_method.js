module.exports = (sequelize, Sequelize) => {
	const Payment_Method = sequelize.define('payment_method', {
		id: {
			type: Sequelize.DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		},
		detail: {
			type: Sequelize.DataTypes.STRING,
			allowNull: true
		}
	})
	return Payment_Method
}