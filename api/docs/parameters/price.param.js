module.exports = {
  PriceParam: {
    name: 'price',
    in: 'query',
    schema: {
      type: 'number',
      format: 'double',
      minimum: 0
    },
    description: 'price of product/item'
  }
};
