module.exports = (sequelize, Sequelize) => {
	const Shipping_Method = sequelize.define('shipping_method', {
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
	return Shipping_Method
}