const Product = require("../models").Product;
const { Op, transaction } = require("../models").sequelize;
const createError = require("http-errors");

exports.caculateSubTotal = async ({ cart_items }) => {
  try {
    cart_items.sort((a, b) => {
      return a.product_id < b.product_id ? -1 : 1;
    });
    const productsToBuy = await Product.findAll({
      where: {
        id: cart_items.map((item) => item.product_id),
      },
      attributes: ["id", "price"],
      order: ["id"],
    });
    if (productsToBuy.length !== cart_items.length)
      throw createError(404, "Any or some product ordered no longer exist");
    let subTotal = 0;
    cart_items.forEach((cartItem, i) => {
      subTotal += serverProducts[cartItem.product_id].price * cartItem.quantity;
    });
    return {
      success: true,
      result: Math.round(subTotal * 100) / 100,
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.checkCartValid = async ({ cart_items }) => {
  try {
    const serverProducts = {};
    const fetchedProducts = await Product.findAll({
      where: {
        id: cart_items.map((item) => item.product_id),
      },
      attributes: [
        "id",
        "enable",
        "name",
        "slug",
        "images",
        "price",
        "quantity",
      ],
      order: ["id"],
    });
    fetchedProducts.forEach((product) => {
      serverProducts[product.id] = product;
    });
    // CHECK ERROR
    let errors = {};
    const valid_items = cart_items.map((cartItem, i) => {
      temp = [];
      let valid_item = { ...cartItem };
      const serverProduct = serverProducts[cartItem.product_id];
      let buy_able = true;
      if (!serverProduct) {
        temp.push("Product is no longer exist");
        buy_able = false;
      } else {
        if (!serverProduct.enable) {
          temp.push("Product is disabled");
          buy_able = false;
        }
        if (serverProduct.quantity === 0) {
          temp.push("Product is sold out");
          buy_able = false;
        } else if (serverProduct.quantity < cartItem.quantity) {
          temp.push(
            `You can only buy up to ${
              serverProducts[cartItem.product_id].quantity
            } products`
          );
          valid_item.quantity = serverProduct.quantity;
        }
        if (serverProduct.price !== cartItem.price) {
          temp.push(
            `Price of product has been changed, you should check again`
          );
          valid_item.price = serverProduct.price;
        }
        if (serverProduct.name !== cartItem.product_name) {
          temp.push(`Name of product has been changed, you should check again`);
          valid_item.product_name = serverProduct.name;
          valid_item.product_slug = serverProduct.slug;
        }
      }
      if (temp.length > 0) errors[i] = temp;
      valid_item.buy_able = buy_able;
      valid_item.product_thumbnail = serverProduct
        ? serverProduct.images[0]
        : null;
      return valid_item;
    });

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
        valid_items: valid_items,
      };
    }

    const subTotal = valid_items.reduce(
      (accumul, cur) => accumul + cur.quantity * cur.price,
      0
    );
    return {
      success: true,
      subTotal: Math.round(subTotal * 100) / 100,
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};
