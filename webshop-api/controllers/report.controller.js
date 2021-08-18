const reportServices = require('../services/report.service')
const asyncHandler = require('express-async-handler')

exports.getOrderReport = asyncHandler(async (req, res, next) => {
	const {start_date, end_date, group_by, current_page, page_size, sort} = req.query
	const result = await reportServices.getOrderReport({start_date, end_date, group_by, current_page, page_size, sort})
	res.status(200).json(result)
})