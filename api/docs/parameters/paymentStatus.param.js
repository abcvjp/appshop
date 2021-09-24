module.exports = {
  PaymentStatusParam: {
    name: 'payment_status',
    in: 'query',
    schema: {
      type: 'string',
      enum: ['Paid', 'Unpaid']
    },
    description: 'payment status of order'
  }
};
