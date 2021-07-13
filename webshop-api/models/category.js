
module.exports = (sequelize, Sequelize) => {
	const Category = sequelize.define("category", {
		id: {
			type: Sequelize.DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		},
		path: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
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

	return Category
}