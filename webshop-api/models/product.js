
module.exports = (sequelize, Sequelize) => {
	const Product = sequelize.define("product", {
		id: {
			type: Sequelize.DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		enable: {
			type: Sequelize.DataTypes.BOOLEAN,
			allowNull: false
		},
		name: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		},
		title: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		},
		price: {
			type: Sequelize.DataTypes.DOUBLE,
			allowNull: false
		},
		quantity: {
			type: Sequelize.DataTypes.INTEGER,
			allowNull: false
		},
		discount: {
			type: Sequelize.DataTypes.DOUBLE,
			allowNull: true
		},
		short_description: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: Sequelize.DataTypes.TEXT('long'),
			allowNull: false
		},
		images: {
			type: Sequelize.DataTypes.JSON,
			allowNull: true
		},
		slug: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		},
		meta_title: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		},
		meta_description: {
			type: Sequelize.DataTypes.STRING,
			allowNull: true
		},
		meta_keywords: {
			type: Sequelize.DataTypes.STRING,
			allowNull: true
		}
	})

	return Product
}