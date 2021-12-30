const { PaymentMethod, Order, StripeCustomer } = require('../models');
const createError = require('http-errors');

const stripe = require('../stripe');

exports.getPaymentMethods = async () => {
  try {
    const paymentMethods = await PaymentMethod.findAll();
    
    return {
      success: true,
      data: paymentMethods
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.doPaymentWithStripe = async ({
  order_id,
  token_id
}) => {
  try {
    const orderFromDb = await Order.findByPk(order_id, {
      attributes: {
        include: ['id', 'order_total', 'status', 'payment_status', 'customer_name', 'address', 'email', 'phone_number', 'user_id', 'payment_method_id']
      },
      include: {
        association: 'user',
        attributes: ['id', 'email', 'phone_number', 'full_name']
      }
    });

    if (!orderFromDb) {
      throw createError(404, 'Order is not exist');
    }
    if (orderFromDb.status === 'Canceled') {
      throw createError(409, 'This order is cancelled');
    }
    if (orderFromDb.payment_status === 'Paid') {
      throw createError(409, 'This order is already paid');
    }

    const {
      order_total, email, address, customer_name,
      phone_number,
      user_id
    } = orderFromDb;

    const charge = {
      amount: parseInt(order_total*100,10),
      currency: 'usd',
      source: token_id,
      receipt_email: email,
      shipping: {
        address: {
          line1: address
        },
        name: customer_name,
        phone: phone_number
      },
      metadata: {
        order_id: orderFromDb.id,
        user_id: user_id
      }
    };

    if (!user_id) {
      // CASE ORDER WITHOUT USER
    } else {
      // CASE ORDER ATTACHED WITH USER
      let customer_id = null;
      const customerFromDb = await StripeCustomer.findOne({
        where: { user_id },
        attributes: ['customer_id']
      });
      if (!customerFromDb) {
        const newStripeCustomer = await stripe.customers.create({
          email: orderFromDb.user.email,
          source: token_id,
          name: orderFromDb.user.full_name,
          phone: orderFromDb.user.phone_number,
          metadata: {
            user_id: orderFromDb.user.id
          }
        });
        StripeCustomer.create({
          user_id,
          customer_id: newStripeCustomer.id
        });
        customer_id = newStripeCustomer.id;
      } else {
        customer_id = customerFromDb.customer_id;
      }

      const newPaymentSource = await stripe.customers.createSource(customer_id, {
        source: token_id
      });
      await stripe.customers.update(customer_id, {
        default_source: newPaymentSource.id
      }).then(customer => {
        charge.source = customer.default_source.id;
      })
      charge.customer = customer_id;
    }

    const { amount, currency, receipt_url, receipt_email } = await stripe.charges.create(charge);

    await orderFromDb.update({
      payment_status: 'Paid'
    });

    return {
      success: true,
      result: {
        amount,
        currency,
        receipt_email,
        receipt_url
      }
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};

exports.createCardToken = async () => {
  try {
    const token = await stripe.tokens.create({
      card: {
        number: '4242424242424242',
        exp_month: 12,
        exp_year: 2022,
        cvc: '314',
      },
    });
    console.log(token)

    return {
      success: true,
      result: token
    };
  } catch (error) {
    throw createError(error.statusCode || 500, error.message);
  }
};