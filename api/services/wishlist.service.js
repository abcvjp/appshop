const { Sequelize } = require('../models');
const { WishItem, Product } = require('../models');
const { calculateLimitAndOffset, paginate } = require('paginate-info');
const createError = require('http-errors');

exports.getWishList = async ({
	user_id,
	current_page,
	page_size
}) => {
  try {
    const { limit, offset } = calculateLimitAndOffset(current_page, page_size);
    const { rows, count } = await Product.findAndCountAll({
        attributes: {
			include: [
          		[Sequelize.literal(`(SELECT star from ProductStars WHERE product_id = Product.id)`), 'star'],
			],
			exclude: ['published', 'description', 'meta_title', 'meta_description', 'meta_keywords', 'images', 'category_id']
		},
		include: [
			{
				model: WishItem,
				where: {
					user_id
				},
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