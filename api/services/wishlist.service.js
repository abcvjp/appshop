const { WishItem, Product } = require('../models');
const createError = require('http-errors');
const { calculateLimitAndOffset, paginate } = require('paginate-info');

exports.getWishList = async ({
	user_id,
	current_page,
	page_size
}) => {
  try {
    const { limit, offset } = calculateLimitAndOffset(current_page, page_size);
    const { rows, count } = await Product.findAndCountAll({
        attributes: {
			exclude: ['published', 'description', 'meta_title', 'meta_description', 'meta_keywords', 'images', 'category_id']
		},
		include: [
			{
				model: WishItem,
				required: true,
				attributes: []
			},
			{
				association: 'category',
				required: true,
				attributes: ['id', 'name', 'path', 'slug']
			}
		],
		limit,
		offset,
		order: [['createdAt', 'DESC']]
    });
    if (rows.length < 1) throw createError(404, 'Can not find any wishlist item');
    const pagination = paginate(current_page, count, rows, page_size);
    return {
      success: true,
      data: rows,
      pagination
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.addProductToWishlist = async ({
	user_id,
	product_id
}) => {
	try {
		await WishItem.create({
			user_id,
			product_id
		})
		return {
			success: true,
		};
	} catch (error) {
		throw createError(error.statusCode || 500, error.message);
	}
};

exports.removeProductFromWishlist = async ({
	user_id,
	product_id
}) => {
	try {
		await WishItem.destroy({
			where: {
				user_id,
				product_id
			}
		});
		return {
			success: true,
		};
	} catch (error) {
		throw createError(error.statusCode || 500, error.message);
	}
};