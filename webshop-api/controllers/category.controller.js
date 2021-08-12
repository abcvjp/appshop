const categoryService = require('../services/category.service')
const createError = require('http-errors')
const asyncHandler = require('express-async-handler')

exports.getCategories = asyncHandler(async (req, res, next) => {
	const {current_page, page_size, sort} = req.query
	const result = await categoryService.getCategories({current_page, page_size, sort})
	res.status(200).json(result)
})

exports.getCategoryById = asyncHandler(async (req, res, next) => {
	const categoryId = req.params.categoryId
	const result = await categoryService.getCategoryById({ id: categoryId })
	res.status(200).json(result)
})

exports.getCategory = asyncHandler(async (req, res, next) => {
	const { id, slug, include_childs, include_products } = req.query
	const result = id ? await categoryService.getCategoryById({ id, include_childs, include_products })
		: await categoryService.getCategoryBySlug({ slug, include_childs, include_products })
	res.status(200).json(result)
})

exports.createCategory = asyncHandler(async (req, res, next) => {
	const { name, description, parent_id, published, meta_title, meta_description, meta_keywords } = req.body
	const result = await categoryService.createCategory({
		name, description, parent_id, published, meta_title, meta_description, meta_keywords
	})
	res.status(200).json(result)
})

exports.updateCategory = asyncHandler(async (req, res, next) => {
	const { categoryId } = req.params
	const { name, parent_id, description, meta_title, meta_description, meta_keywords } = req.body
	const result = await categoryService.updateCategory({ id: categoryId, name, parent_id, description, meta_title, meta_description, meta_keywords })
	res.status(200).json(result)
})

exports.deleteCategory = asyncHandler(async (req, res, next) => {
	const { categoryId } = req.params
	const result = await categoryService.deleteCategory({ id: categoryId })
	res.status(200).json(result)
})

exports.deleteCategories = asyncHandler(async (req, res, next) => {
	const { categoryIds } = req.body
	const result = await categoryService.deleteCategories({ categoryIds })
	res.status(200).json(result)
})