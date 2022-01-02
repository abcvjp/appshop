const sampleShippingMethods = [
  {
    name: 'Store Pickup',
    detail: 'You can go to our store to pick up products directly',
    fee: 0,
  },
  {
    name: 'Free Shipping',
    detail: 'Our policy provide a zero-fee delivery method',
    fee: 0,
  },
  {
    name: 'Fast Shipping',
    detail: 'Faster delivery provided by carriers which you can choose',
    fee: 2,
  }
];

sampleShippingMethods.forEach(record => {
  record.createdAt = new Date();
  record.updatedAt = new Date();
});

module.exports = sampleShippingMethods;