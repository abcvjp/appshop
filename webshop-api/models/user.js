
module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("user", {
		id: {
			type: Sequelize.DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: Sequelize.DataTypes.STRING,
			field: 'username',
			allowNull: false
		},
		full_name: {
			type: Sequelize.DataTypes.STRING,
			field: 'full_name',
			allowNull: false
		},
		email: {
			type: Sequelize.DataTypes.STRING,
			field: 'email',
			allowNull: false
		},
		hash: {
			type: Sequelize.DataTypes.STRING,
			field: 'hash',
			allowNull: false
		},
		salt: {
			type: Sequelize.DataTypes.STRING,
			field: 'salt',
			allowNull: false
		},
	})

	return User
}