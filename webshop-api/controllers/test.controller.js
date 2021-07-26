const testService = require('../services/test.service')
const { Category, sequelize } = require('../models')
const asyncHandler = require('express-async-handler')

const getAll = asyncHandler(async (req, res, next) => {
	const include_model = {
		model: Category,
		as: 'childs',
		require: true,
		attributes: ['id', 'name', 'slug']
	}
	const include_condition = {}
	for (let i = 1, iter = include_condition; i < 3; i++) {
		iter['include'] = { ...include_model }
		iter = iter['include']
	}
	console.log(include_condition)
	// const result = await Category.findOne({
	// where: {
	// id: 'd08e5a2d-fba2-4d5b-90cd-8cc1cd90e989'
	// },
	// ...include_condition
	// })
	const [result] = await sequelize.query(`WITH RECURSIVE cte (id, name, parent_id) AS
		(
			SELECT id, name, parent_id FROM Categories WHERE slug='thoi-trang-nu'
			UNION
			SELECT c.id, c.name, c.parent_id FROM Categories c INNER JOIN cte ON c.parent_id = cte.id
		)
		SELECT * FROM cte;
	`)
	res.status(200).json({ result })
})

module.exports = {
	getAll
}