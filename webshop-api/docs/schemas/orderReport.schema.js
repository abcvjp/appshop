module.exports = {
  OrderReport: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuidv4',
        readOnly: true,
        nullable: false
      },
      day: {
        type: 'string',
        minimum: 0,
        readOnly: true
      },
      orders_number: {
        type: 'integer',
        minimum: 0,
        readOnly: true
      },
      conpleted_orders_number: {
        type: 'interger',
        minimum: 0,
        readOnly: true
      },
      item_total: {
        type: 'integer',
        minimum: 0,
        readOnly: true
      },
      items_number: {
        type: 'integer',
        minimum: 0,
        readOnly: true
      },
      shipping_fee: {
        type: 'number',
        format: 'double',
        minimum: 0,
        readOnly: true
      },
      order_total: {
        type: 'number',
        format: 'double',
        minimum: 0,
        readOnly: true
      },
      expected_profit: {
        type: 'number',
        format: 'double',
        minimum: 0,
        readOnly: true
      }
    }
  }
};
