const {
  Order,
  Product,
  OrderItem,
  ShippingMethod,
  PaymentMethod
} = require('../models');
const { sequelize, Sequelize } = require('../models');
const createError = require('http-errors');
const { uuid } = require('uuidv4');
const { calculateLimitAndOffset, paginate } = require('paginate-info');
const { roundPrice } = require('../helpers/logicFunc.helper');
const { orderConfirmationMailQueue } = require('../queues');

exports.getOrders = async ({
  id,
  customer_name,
  email,
  phone_number,
  status,
  payment_status,
  shipping_status,
  start_date,
  end_date,
  current_page,
  page_size,
  sort
}) => {
  try {
    const whereConditions = {};
    if (id) {
      whereConditions['id'] = id;
    }
    if (customer_name) {
      whereConditions['customer_name'] = customer_name;
    }
    if (email) {
      whereConditions['email'] = email;
    }
    if (phone_number) {
      whereConditions['phone_number'] = phone_number;
    }
    if (status) {
      whereConditions['status'] = status;
    }
    if (payment_status) {
      whereConditions['payment_status'] = payment_status;
    }
    if (shipping_status) {
      whereConditions['shipping_status'] = shipping_status;
    }
    if (start_date) {
      if (!end_date) {
        whereConditions['createdAt'] = {
          [Sequelize.Op.gte]: start_date
        };
      } else {
        whereConditions['createdAt'] = {
          [Sequelize.Op.between]: [start_date, end_date]
        };
      }
    } else if (end_date) {
      whereConditions['createdAt'] = {
        [Sequelize.Op.lte]: end_date
      };
    }

    const { limit, offset } = calculateLimitAndOffset(current_page, page_size);
    const { rows, count } = await Order.findAndCountAll({
      where: whereConditions,
      include: [
        {
          association: 'payment_method',
          attributes: ['name']
        },
        {
          association: 'shipping_method',
          attributes: ['name']
        },
        {
          association: 'order_items',
          attributes: [
            'product_id',
            'product_name',
            'product_thumbnail',
            'price',
            'quantity'
          ]
        }
      ],
      attributes: {
        exclude: ['payment_method_id', 'shipping_method_id']
      },
      limit,
      offset,
      order: sort ? [sort.split('.')] : [['createdAt', 'DESC']]
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

exports.getOrderById = async ({ id }) => {
  try {
    const orderById = await Order.findByPk(id, {
      include: [
        {
          association: 'payment_method',
          attributes: ['name']
        },
        {
          association: 'shipping_method',
          attributes: ['name']
        },
        {
          association: 'order_items',
          attributes: [
            'product_id',
            'product_name',
            'product_thumbnail',
            'price',
            'quantity'
          ]
        }
      ],
      attributes: {
        exclude: ['payment_method_id', 'shipping_method_id']
      }
    });
    if (!orderById) throw createError(404, 'Order does not exist');
    return {
      success: true,
      data: orderById
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.getOrdersByUserId = async ({
  user_id,
  status,
  payment_status,
  shipping_status,
  start_date,
  end_date,
  current_page,
  page_size,
  sort
}) => {
  try {
    const whereConditions = {
      user_id
    };
    if (status) {
      whereConditions['status'] = status;
    }
    if (payment_status) {
      whereConditions['payment_status'] = payment_status;
    }
    if (shipping_status) {
      whereConditions['shipping_status'] = shipping_status;
    }
    if (start_date) {
      if (!end_date) {
        whereConditions['createdAt'] = {
          [Sequelize.Op.gte]: start_date
        };
      } else {
        whereConditions['createdAt'] = {
          [Sequelize.Op.between]: [start_date, end_date]
        };
      }
    } else if (end_date) {
      whereConditions['createdAt'] = {
        [Sequelize.Op.lte]: end_date
      };
    }

    const { limit, offset } = calculateLimitAndOffset(current_page, page_size);
    const { rows, count } = await Order.findAndCountAll({
      where: whereConditions,
      include: [
        {
          association: 'payment_method',
          attributes: ['name']
        },
        {
          association: 'shipping_method',
          attributes: ['name']
        },
        {
          association: 'order_items',
          attributes: [
            'product_id',
            'product_name',
            'product_thumbnail',
            'price',
            'quantity'
          ]
        }
      ],
      attributes: {
        exclude: ['payment_method_id', 'shipping_method_id']
      },
      limit,
      offset,
      order: sort ? [sort.split('.')] : [['createdAt', 'DESC']]
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

exports.createOrder = async ({
  user_id,
  customer_name,
  address,
  email,
  phone_number,
  shipping_note,
  payment_method_id,
  shipping_method_id,
  order_items
}) => {
  try {
    // VALID AND CACULATE TOTAL COST

    // fetch product and shipping method
    const [productsInDB, shippingMethod, paymentMethod] = await Promise.all([
      Product.findAll({
        where: {
          id: order_items.map((item) => item.product_id)
        },
        attributes: [
          'id',
          'enable',
          'price',
          'root_price',
          'quantity',
          'name',
          'preview',
          'images'
        ],
        order: ['id']
      }),
      ShippingMethod.findByPk(shipping_method_id, {
        attributes: ['id', 'fee']
      }),
      PaymentMethod.findByPk(payment_method_id, { attributes: ['id'] })
    ]);
    if (!shippingMethod)
      throw createError(404, 'Shipping method does not exist');
    if (!paymentMethod) throw createError(404, 'Payment method does not exist');
    if (productsInDB.length !== order_items.length)
      throw createError(409, 'Any or some product ordered no longer exist');

    const productsFromServer = {};
    productsInDB.forEach(product => {
      productsFromServer[product.id] = product;
    });

    let item_total = 0;
    let item_root_total = 0;
    let items_number = 0;

    order_items.forEach((orderItem) => {
      const productFromServer = productsFromServer[orderItem.product_id];
      if (!productFromServer.enable) {
        throw createError(409, `Product ${orderItem.product_name} is disabled`);
      }
      if (productFromServer.quantity < orderItem.quantity) {
        throw createError(
          409,
          `Stock quantity of ${orderItem.product_name} is not enough`
        );
      }
      if (productFromServer.price !== orderItem.price) {
        throw createError(
          409,
          `Price of ${orderItem.product_name} has changed`
        );
      }

      orderItem.product_thumbnail = productFromServer.preview;
      item_total += productFromServer.price * orderItem.quantity;
      item_root_total += productFromServer.root_price * orderItem.quantity;
      items_number += orderItem.quantity;
    });

    // CREATE ORDER DATA
    const shipping_fee = shippingMethod.fee;
    item_total = roundPrice(item_total);
    item_root_total = roundPrice(item_root_total);
    const profit = roundPrice(item_root_total - item_total);
    const order_total = roundPrice(item_total + shipping_fee);
    const id = uuid(); // generate id
    const newOrder = {
      id,
      user_id,
      order_total,
      item_total,
      shipping_fee,
      customer_name,
      address,
      email,
      phone_number,
      shipping_note,
      payment_method_id,
      shipping_method_id
    };

    // CREATE ORDER AND ORDER ITEMS
    await sequelize.transaction(async (t) => {
      let promises = [
        Order.create(newOrder, {
          profit,
          items_number
        })
      ]; // create order
      order_items.forEach(order_item => {
        // create order items and update product stock quantity
        promises.push(
          OrderItem.create({
            ...order_item,
            order_id: newOrder.id
          }),
          productsFromServer[order_item.product_id].decrement('quantity', {
            by: order_item.quantity
          })
        );
      });
      await Promise.all(promises);
    });

    return {
      success: true,
      result: {
        ...newOrder,
        order_items
      }
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.updateOrderInfo = async ({
  id,
  customer_name,
  address,
  email,
  phone_number,
  shipping_note
}) => {
  try {
    const orderToUpdate = await Order.findByPk(id);
    if (!orderToUpdate) throw createError(404, 'Order does not exist');

    const orderAfterUpdate = await orderToUpdate.update({
      customer_name,
      address,
      email,
      phone_number,
      shipping_note
    });
    return {
      success: true,
      result: orderAfterUpdate
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.updateOrdersStatus = async ({ orders }) => {
  try {
    orders.sort((a, b) => {
      return a.id < b.id ? -1 : 1;
    });
    const ordersToUpdate = await Order.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: orders.map((order) => order.id)
        }
      },
      order: ['id']
    });
    if (ordersToUpdate.length !== orders.length)
      throw createError(404, 'Any order does not exist');
    const promises = [];
    ordersToUpdate.forEach((order, index) => {
      const beforeStatus = order.status;
      const afterStatus = orders[index].status;
      if (beforeStatus === 'Completed' || beforeStatus === 'Canceled') {
        throw createError(409, `Order ${order.id} is ${beforeStatus}`);
      } else if (afterStatus === 'Completed' && beforeStatus === 'Handling') {
        promises.push(
          order.update({
            status: 'Completed',
            payment_status: 'Paid',
            shipping_status: 'Successfully delivered'
          })
        );
      } else if (afterStatus === 'Handling' && beforeStatus === 'Pending') {
        promises.push(order.update({ status: 'Handling' }));
      } else if (afterStatus === 'Canceled') {
        promises.push(order.update({ status: 'Canceled' }));
      } else {
        throw createError(
          409,
          `Order ${order.id} is ${beforeStatus} and can not be ${afterStatus}`
        );
      }
    });
    await sequelize.transaction(async (t) => {
      await Promise.all(promises);
    });
    return { success: true };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.deleteOrder = async ({ id }) => {
  try {
    const orderToDelete = await Order.findByPk(id, {
      include: {
        association: 'order_items',
        attributes: ['id']
      }
    });
    if (!orderToDelete) throw createError(404, 'Order does not exist');
    await sequelize.transaction(async (t) => {
      await Promise.all([
        orderToDelete.destroy(),
        ...orderToDelete.order_items.map((item) => item.destroy())
      ]);
    });

    return { success: true };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.cancelOrder = async ({ id }) => {
  try {
    const orderToCancel = await Order.findByPk(id, {
      include: {
        association: 'order_items',
        attributes: ['product_id', 'quantity']
      }
    });
    if (!orderToCancel) throw createError(404, 'Order does not exist');
    if (orderToCancel.status === 'Canceled')
      throw createError(409, 'Order is already canceled');
    if (orderToCancel.status === 'Completed')
      throw createError(409, 'Order is completed');

    const productsToRestore = await Product.findAll({
      where: {
        id: orderToCancel.order_items.map((orderItem) => orderItem.product_id)
      },
      attributes: ['id']
    });

    // convert orderItems to set(dictionary) productId - quantity
    const set_productId_quantity = {};
    orderToCancel.order_items.forEach((item) => {
      set_productId_quantity[item.product_id] = item.quantity;
    });

    await sequelize.transaction(async (t) => {
      await Promise.all([
        // CANCEL ORDER AND RESTORE PRODUCT QUANTITY IF PRODUCT EXIST
        orderToCancel.update({ status: 'Canceled' }),
        productsToRestore.map((product) => {
          product.increment('quantity', {
            by: set_productId_quantity[product.id]
          });
        })
      ]);
    });
    return { success: true };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.confirmlOrder = async ({ id }) => {
  try {
    const orderToConfirm = await Order.findByPk(id, {
      include: [
        {
          association: 'payment_method',
          attributes: ['name']
        },
        {
          association: 'shipping_method',
          attributes: ['name']
        },
        {
          association: 'order_items',
          attributes: [
            'product_id',
            'product_name',
            'product_thumbnail',
            'price',
            'quantity'
          ]
        }
      ],
      attributes: {
        exclude: ['payment_method_id', 'shipping_method_id']
      }
    });
    if (!orderToConfirm) throw createError(404, 'Order does not exist');
    if (orderToConfirm.status === 'Canceled') {
      throw createError(409, 'Order is canceled');
    } else if (orderToConfirm.status !== 'Pending')
      throw createError(409, 'Order is already confirmed');

    await sequelize.transaction(async (t) => {
      await orderToConfirm.update({ status: 'Handling' });
      orderConfirmationMailQueue.add(
        `Send email: confirm order ${orderToConfirm.id}`,
        {
          order: orderToConfirm
        }
      );
    });

    return { success: true };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.completelOrder = async ({ id }) => {
  try {
    const orderToComplete = await Order.findByPk(id, {
      attributes: ['id', 'status'],
      include: {
        association: 'order_items',
        attributes: ['product_id', 'quantity']
      }
    });
    if (!orderToComplete) throw createError(404, 'Order does not exist');
    if (orderToComplete.status === 'Pending')
      throw createError(409, 'Order is not comfirmed yet');
    if (orderToComplete.status === 'Completed')
      throw createError(409, 'Order is already completed');
    if (orderToComplete.status === 'Canceled')
      throw createError(409, 'Order is canceled');

    const productsToUpdateSold = await Product.findAll({
      where: {
        id: orderToComplete.order_items.map((orderItem) => orderItem.product_id)
      },
      attributes: ['id']
    });

    // convert orderItems to set(dictionary) productId - quantity
    const set_productId_quantity = {};
    orderToComplete.order_items.forEach((item) => {
      set_productId_quantity[item.product_id] = item.quantity;
    });

    await sequelize.transaction(async (t) => {
      await Promise.all([
        // COMPLETE ORDER AND UPDATE PRODUCT SOLD IF PRODUCT EXIST
        orderToComplete.update({
          status: 'Completed',
          payment_status: 'Paid',
          shipping_status: 'Successfully delivered'
        }),
        productsToUpdateSold.map((product) => {
          product.increment('sold', { by: set_productId_quantity[product.id] });
        })
      ]);
    });

    return { success: true };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.updateShippingStatus = async ({ id, shipping_status }) => {
  try {
    const orderToUpdate = await Order.findByPk(id, {
      attributes: ['id', 'status', 'shipping_status', 'payment_status']
    });
    if (!orderToUpdate) throw createError(404, 'Order does not exist');
    if (
      orderToUpdate.status !== 'Handling' ||
      orderToUpdate.shipping_status === 'Successfully delivered'
    )
      throw createError(
        409,
        'This order is not allowed to change shipping status'
      );

    if (
      orderToUpdate.payment_status === 'Paid' &&
      shipping_status == 'Successfully delivered'
    ) {
      var status = 'Completed';
    }

    await orderToUpdate.update({
      shipping_status,
      ...status
    });
    return {
      success: true,
      result: orderToUpdate
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.updatePaymentStatus = async ({ id, payment_status }) => {
  try {
    const orderToUpdate = await Order.findByPk(id, {
      attributes: ['id', 'status', 'shipping_status', 'payment_status']
    });
    if (!orderToUpdate) throw createError(404, 'Order does not exist');
    if (
      orderToUpdate.payment_status === 'Completed' ||
      orderToUpdate.status == 'Canceled'
    )
      throw createError(
        409,
        'This order is not allowed to change payment status'
      );

    await orderToUpdate.update({
      payment_status
    });
    return {
      success: true,
      result: orderToUpdate
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};
