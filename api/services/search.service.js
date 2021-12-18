const { Category } = require('../models');
const { Sequelize, sequelize } = require('../models');
const createError = require('http-errors');
const { calculateLimitAndOffset, paginate } = require('paginate-info');
const { deleteObjProps } = require('../helpers/js.helper');

exports.searchProducts = async ({
  keyword,
  category_id,
  current_page,
  page_size,
  sort,
  enable,
  published,
  in_stock,
  price,
  exclude
}) => {
  try {
    const { limit, offset } = calculateLimitAndOffset(current_page, page_size);
    if (category_id !== undefined) {
      const rows = await sequelize.query(
        `
				WITH RECURSIVE cte (id, name, slug, parent_id) AS
				(
					SELECT id, name, parent_id, slug FROM Categories WHERE id = '${category_id}'
					UNION
					SELECT c.id, c.name, c.parent_id, c.slug FROM Categories c INNER JOIN cte ON c.parent_id = cte.id
				)
				SELECT p.id, p.name, p.enable, p.published, p.title, p.price, p.root_price, 1-p.price/p.root_price AS discount,
					p.quantity, p.sold,
					p.short_description, p.description,
          p.preview, p.images, (SELECT star from ProductStars WHERE product_id = p.id) as star,
          p.slug, p.meta_title, p.meta_keywords, p.meta_description,
					p.createdAt, p.updatedAt, cte.id as 'category.id', cte.name as 'category.name', cte.slug as 'category.slug',
					MATCH (p.name,p.title,p.meta_keywords) AGAINST ('${keyword}' IN BOOLEAN MODE) as relevance
				FROM Products p INNER JOIN cte ON p.category_id = cte.id
				WHERE
					${published !== undefined ? `p.published = ${published ? 1 : 0}` : '1=1'}
					AND ${enable !== undefined ? `p.enable = ${enable ? 1 : 0}` : '1=1'}
					AND ${
            in_stock !== undefined
              ? `p.quantity ${in_stock ? `${'> 0'}` : `${' = 0'}`}`
              : '1=1'
          }
					AND MATCH (p.name,p.title,p.meta_keywords) AGAINST ('${keyword}' IN BOOLEAN MODE)
					AND ${
            price !== undefined
              ? `p.price BETWEEN ${price.split(',')[0]} AND ${
                  price.split(',')[1]
                }`
              : '1=1'
          }
				ORDER BY ${sort !== undefined ? sort.replace('.', ' ') : 'relevance DESC'};
			`,
        { nest: true, raw: true }
      );
      var count = rows.length;
      var result = rows.slice(offset, offset + limit);
    } else {
      const rows = await sequelize.query(
        `
				SELECT p.id, p.name, p.enable, p.published, p.title, p.price, p.root_price, 1-p.price/p.root_price AS discount,
					p.quantity, p.sold,
					p.short_description, p.description,
          p.preview, p.images, (SELECT star from ProductStars WHERE product_id = p.id) as star,
          p.slug, p.meta_title, p.meta_keywords, p.meta_description,
					p.createdAt, p.updatedAt,
					c.name as 'category.name', c.id as 'category.id', c.name as 'category.name', c.slug as 'category.slug',
					MATCH (p.name,p.title,p.meta_keywords) AGAINST ('${keyword}' IN BOOLEAN MODE) as relevance
				FROM Products p INNER JOIN Categories c ON p.category_id = c.id
				WHERE
					${published !== undefined ? `p.published = ${published ? 1 : 0}` : '1=1'}
					AND ${enable !== undefined ? `p.enable = ${enable ? 1 : 0}` : '1=1'}
					AND ${
            in_stock !== undefined
              ? `p.quantity ${in_stock ? `${'> 0'}` : `${' = 0'}`}`
              : '1=1'
          }
					AND MATCH (p.name,p.title,p.meta_keywords) AGAINST ('${keyword}' IN BOOLEAN MODE)
					AND ${
            price !== undefined
              ? `p.price BETWEEN ${price.split(',')[0]} AND ${
                  price.split(',')[1]
                }`
              : '1=1'
          }
				ORDER BY ${sort !== undefined ? sort.replace('.', ' ') : 'relevance DESC'};
			`,
        { nest: true, raw: true }
      );
      var count = rows.length;
      var result = rows.slice(offset, offset + limit);
    }
    if (result.length < 1) throw createError(404, `No result found`);
    const pagination = paginate(current_page, count, result, page_size);

    if (exclude) {
      result.forEach((i) => {
        deleteObjProps(i, exclude);
      });
    }

    // convert 1-0 to true-false
    result.forEach((x) => {
      x['enable'] = x['enable'] === 1;
      x['published'] = x['published'] === 1;
    });

    return {
      success: true,
      data: result,
      pagination
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.searchCategories = async ({
  keyword,
  current_page,
  page_size,
  sort,
  published,
  exclude
}) => {
  try {
    let filters = {};
    if (published !== undefined) {
      filters.published = published;
    }
    let order_by;
    if (sort !== undefined) {
      order_by = sort.split('.');
      if (order_by[0] === 'relevance') {
        order_by[0] = Sequelize.literal('relevance');
      }
    }

    const { limit, offset } = calculateLimitAndOffset(current_page, page_size);
    const { rows, count } = await Category.findAndCountAll({
      where: [
        filters,
        Sequelize.literal(
          `MATCH (name, path, meta_keywords) AGAINST ('${keyword}' IN BOOLEAN MODE)`
        )
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(
              `MATCH (name, path, meta_keywords) AGAINST('${keyword}' IN BOOLEAN MODE)`
            ),
            'relevance'
          ]
        ],
        exclude
      },
      limit,
      offset,
      order: [order_by ? order_by : [Sequelize.literal('relevance'), 'DESC']]
    });
    if (rows.length < 1) throw createError(404, 'Can not find any category');
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
