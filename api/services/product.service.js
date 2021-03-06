const Product = require('../models').Product;
const { sequelize, Sequelize } = require('../models');
const createError = require('http-errors');
const slug = require('slug');
const { uuid } = require('uuidv4');
const { calculateLimitAndOffset, paginate } = require('paginate-info');
const { roundPrice } = require('../helpers/logicFunc.helper');
const { deleteObjProps } = require('../helpers/js.helper');

exports.getProducts = async ({
  current_page,
  page_size,
  sort,
  category_id,
  category_slug,
  enable,
  published,
  in_stock,
  price,
  include,
  exclude
}) => {
  try {
    const { limit, offset } = calculateLimitAndOffset(current_page, page_size);
    if (category_id !== undefined) {
      const rows = await sequelize.query(
        `
				WITH RECURSIVE cte (id, name, parent_id, slug) AS
				(
					SELECT id, name, parent_id, slug FROM Categories WHERE id = '${category_id}'
					UNION
					SELECT c.id, c.name, c.parent_id, c.slug FROM Categories c INNER JOIN cte ON c.parent_id = cte.id
				)
				SELECT p.id, p.name, p.enable, p.published, p.title, p.price, p.root_price, 1-p.price/p.root_price AS discount,
					p.quantity, p.sold,
					p.short_description, p.description, p.images, p.slug, p.meta_title, p.meta_keywords, p.meta_description,
					p.createdAt, p.updatedAt, cte.id as 'category.id', cte.name as 'category.name', cte.slug as 'category.slug'
				FROM Products p INNER JOIN cte ON p.category_id = cte.id
				WHERE
					${published !== undefined ? `p.published = ${published ? 1 : 0}` : '1=1'}
					AND ${enable !== undefined ? `p.enable = ${enable ? 1 : 0}` : '1=1'}
					AND ${
            in_stock !== undefined
              ? `p.quantity ${in_stock ? `${'> 0'}` : `${' = 0'}`}`
              : '1=1'
          }
					AND ${
            price !== undefined
              ? `p.price BETWEEN ${price.split(',')[0]} AND ${
                  price.split(',')[1]
                }`
              : '1=1'
          }
				ORDER BY ${sort !== undefined ? sort.replace('.', ' ') : 'createdAt DESC'};
			`,
        { nest: true }
      );
      // console.log(rows)
      var count = rows.length;
      var result = rows.slice(offset, offset + limit);
      if (exclude) {
        result.forEach((i) => {
          deleteObjProps(i, exclude);
        });
      }
    } else if (category_slug !== undefined) {
      const rows = await sequelize.query(
        `
				WITH RECURSIVE cte (id, name, parent_id, slug) AS
				(
					SELECT id, name, parent_id, slug FROM Categories WHERE slug = '${category_slug}'
					UNION
					SELECT c.id, c.name, c.parent_id, c.slug FROM Categories c INNER JOIN cte ON c.parent_id = cte.id
				)
				SELECT p.id, p.name, p.enable, p.published, p.title, p.price, p.root_price, 1-p.price/p.root_price AS discount,
					p.quantity, p.sold,
					p.short_description, p.description, p.images, p.slug, p.meta_title, p.meta_keywords, p.meta_description,
					p.createdAt, p.updatedAt, cte.id as 'category.id', cte.name as 'category.name', cte.slug as 'category.slug'
				FROM Products p INNER JOIN cte ON p.category_id = cte.id
				WHERE
					${published !== undefined ? `p.published = ${published ? 1 : 0}` : '1=1'}
					AND ${enable !== undefined ? `p.enable = ${enable ? 1 : 0}` : '1=1'}
					AND ${
            in_stock !== undefined
              ? `p.quantity ${in_stock ? `${'> 0'}` : `${' = 0'}`}`
              : '1=1'
          }
					AND ${
            price !== undefined
              ? `p.price BETWEEN ${price.split(',')[0]} AND ${
                  price.split(',')[1]
                }`
              : '1=1'
          }
				ORDER BY ${sort !== undefined ? sort.replace('.', ' ') : 'createdAt DESC'};
			`,
        { nest: true }
      );
      var count = rows.length;
      var result = rows.slice(offset, offset + limit);
      if (exclude) {
        result.forEach((i) => {
          deleteObjProps(i, exclude);
        });
      }
    } else {
      const filter = {};
      if (enable !== undefined) {
        filter.enable = enable ? 1 : 0;
      }
      if (in_stock !== undefined) {
        filter.quantity = in_stock ? { [Sequelize.Op.gt]: 0 } : 0;
      }
      if (published !== undefined) {
        filter.published = published ? 1 : 0;
      }
      if (price !== undefined) {
        filter.price = {
          [Sequelize.Op.between]: price.split(',')
        };
      }
      if (sort !== undefined) {
        sort = sort.split('.');
        if (sort[0] === 'discount') {
          sort[0] = Sequelize.literal('discount');
        }
      } else {
        sort = ['createdAt', 'DESC'];
      }
      var { rows, count } = await Product.findAndCountAll({
        include: {
          association: 'category',
          required: true,
          attributes: ['id', 'name', 'slug']
        },
        where: filter,
        attributes: {
          include: [[Sequelize.literal('1-price/root_price'), 'discount']],
          exclude: ['category_id'].concat(exclude)
        },
        limit,
        offset,
        order: [sort]
      });
      var result = rows;
    }
    if (result.length < 1) throw createError(404, "Can't find any product");
    const pagination = paginate(current_page, count, result, page_size);

    return {
      success: true,
      data: result,
      pagination
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.getProductBySlug = async ({ slug }) => {
  try {
    const productBySlug = await Product.findOne({
      where: { slug },
      include: {
        association: 'category',
        required: true,
        attributes: ['id', 'name', 'path', 'slug']
      },
      attributes: {
        exclude: ['category_id']
      }
    });
    if (!productBySlug) throw createError(404, 'Product does not exist');
    return {
      success: true,
      data: productBySlug
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.getProductById = async ({ id }) => {
  try {
    const productById = await Product.findByPk(id, {
      include: {
        association: 'category',
        required: true,
        attributes: ['id', 'name', 'path', 'slug']
      },
      attributes: {
        exclude: ['category_id']
      }
    });
    if (!productById) throw createError(404, 'Product does not exist');
    return {
      success: true,
      data: productById
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.getRelatedProducts = async ({ productId }) => {
  try {
    const productById = await Product.findByPk(productId, {
      attributes: ['category_id']
    });
    if (!productById) throw createError(404, 'Product does not exist');
    const relatedProducts = await Product.findAll({
      where: {
        category_id: productById.category_id
      },
      limit: 10
    });
    return {
      success: true,
      data: relatedProducts
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.createProduct = async ({
  enable,
  published,
  name,
  title,
  price,
  quantity,
  root_price,
  short_description,
  description,
  images,
  meta_title,
  meta_description,
  meta_keywords,
  category_id
}) => {
  try {
    const id = uuid();
    const slugName = slug(name);
    let temp = roundPrice(price);
    price = temp;
    temp = roundPrice(root_price);
    root_price = temp;
    const newProduct = await Product.create({
      id,
      enable,
      published,
      name,
      title,
      price,
      quantity,
      root_price,
      short_description,
      description,
      images,
      slug: slugName,
      meta_title,
      meta_description,
      meta_keywords,
      category_id
    });
    return { success: true, result: newProduct };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.updateProduct = async ({
  id,
  enable,
  published,
  name,
  title,
  price,
  root_price,
  quantity,
  short_description,
  description,
  images,
  meta_title,
  meta_description,
  meta_keywords,
  category_id
}) => {
  try {
    const productToUpdate = await Product.findByPk(id);
    if (!productToUpdate) throw createError(404, 'Product does not exist');
    if (name && productToUpdate.name !== name) {
      var slugName = slug(name);
    }
    if (price) {
      price = roundPrice(price);
    }
    if (root_price) {
      root_price = roundPrice(root_price);
    }
    const productAfterUpdate = await productToUpdate.update({
      enable,
      published,
      name,
      title,
      price,
      root_price,
      quantity,
      short_description,
      description,
      slug: slugName,
      images,
      meta_title,
      meta_description,
      meta_keywords,
      category_id
    });
    return { success: true, result: productAfterUpdate };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.updateProducts = async ({ products }) => {
  try {
    products.sort((a, b) => {
      return a.id < b.id ? -1 : 1;
    });
    const productsToUpdate = await Product.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: products.map((i) => i.id)
        }
      },
      order: ['id']
    });
    if (productsToUpdate.length < products.length)
      throw createError(404, 'Any product does not exist');
    const promises = products.map((product, i) => {
      if (productsToUpdate[i].id !== product.id)
        throw createError(500, 'Error when updating');
      if (product.name && productsToUpdate[i].name !== product.name) {
        product.slug = slug(product.name);
      }
      if (product.price) {
        product.price = roundPrice(product.price);
      }
      if (product.root_price) {
        product.root_price = roundPrice(product.root_price);
      }
      return productsToUpdate[i].update(product);
    });
    await sequelize.transaction(async (t) => {
      await Promise.all(promises);
    });
    return { success: true, result: productsToUpdate };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.deleteProduct = async ({ id }) => {
  try {
    const productToDelete = await Product.findByPk(id);
    if (!productToDelete) throw createError(404, 'Product does not exist');
    await productToDelete.destroy();
    return { success: true };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.deleteProducts = async ({ productIds }) => {
  try {
    const productsToDelete = await Product.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: productIds
        }
      }
    });
    if (productsToDelete.length < productIds.length)
      throw createError(404, 'One or more product does not exist');
    let promises = productsToDelete.map((product) => {
      return product.destroy();
    });
    await sequelize.transaction(async (t) => {
      await Promise.all(promises);
    });
    return {
      success: true
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};
