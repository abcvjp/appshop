const sampleShippingMethods = [
  {
    name: 'Nhận tại cửa hàng',
    detail: 'Nhận sản phẩm tại cửa hàng',
    fee: 0,
  },
  {
    name: 'Giao hàng tận nơi',
    detail: 'Giao hàng đến tận nơi',
    fee: 1,
  }
];

sampleShippingMethods.forEach(record => {
  record.createdAt = new Date();
  record.updatedAt = new Date();
});

module.exports = sampleShippingMethods;