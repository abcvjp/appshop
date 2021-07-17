const categoryService = require('../services/category.service')
const createError = require('http-errors')
const asyncHandler = require('express-async-handler')

exports.getCategories = asyncHandler(async (req, res, next) => {
	const result = await categoryService.getCategories()
	res.status(200).json(result)
})

exports.getCategoryById = asyncHandler(async (req, res, next) => {
	const categoryId = req.params.categoryId
	const result = await categoryService.getCategoryById({ id: categoryId })
	res.status(200).json(result)
})

exports.createCategory = asyncHandler(async (req, res, next) => {
	const { name, description, parentId, meta_title, meta_description, meta_keywords } = req.body
	const result = await categoryService.createCategory({
		name, description, parentId, meta_title, meta_description, meta_keywords
	})
	res.status(200).json(result)
})

exports.updateCategory = asyncHandler(async (req, res, next) => {
	const { categoryId } = req.params
	const { name, description, meta_title, meta_description, meta_keywords } = req.body
	const result = await categoryService.updateCategory({ id: categoryId, name, description, meta_title, meta_description, meta_keywords })
	res.status(200).json(result)
})

exports.deleteCategory = asyncHandler(async (req, res, next) => {
	const { categoryId } = req.params
	const result = await categoryService.deleteCategory({ categoryId })
	res.status(200).json(result)
})