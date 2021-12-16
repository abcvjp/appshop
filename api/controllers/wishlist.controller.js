const wishlistServices = require('../services/wishlist.service');
const asyncHandler = require('express-async-handler');

exports.getWishList = asyncHandler(async (req, res, next) => {
	const userId = req.user.id;
	const { current_page, page_size } = req.query;
	const result = await wishlistServices.getWishList({
		user_id: userId,
		current_page,
		page_size,
	});
	res.status(200).json(result);
});

exports.addProductToWishlist = asyncHandler(async (req, res, next) => {
	const userId = req.user.id;
	const { productId } = req.body;
	const result = await wishlistServices.addProductToWishlist({
		user_id: userId,
		product_id: productId
	});
	res.status(200).json(result);
});

exports.removeProductFromWishlist = asyncHandler(async (req, res, next) => {
	const userId = req.user.id;
	const { productId } = req.body;
	const result = await wishlistServices.removeProductFromWishlist({
		user_id: userId,
		product_id: productId
	});
	res.status(200).json(result);
});