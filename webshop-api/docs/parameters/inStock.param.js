module.exports = {
  InStockParam: {
    name: 'in_stock',
    in: 'query',
    schema: {
      type: 'boolean',
      enum: [true, false]
    },
    description: 'in stock or out of stock'
  }
};
