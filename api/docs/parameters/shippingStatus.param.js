module.exports = {
  ShippingStatusParam: {
    name: 'shipping_status',
    in: 'query',
    schema: {
      type: 'string',
      enum: [
        'Undelivered',
        'Delivering',
        'Successfully delivered',
        'Delivery failed'
      ]
    },
    description: 'shipping status of order'
  }
};
