const samplePaymentMethods = [
  {
    name: 'COD',
    detail: 'Thanh toán bằng tiền mặt khi nhận hàng',
  },
  {
    name: 'Chuyển khoản ngân hàng',
    detail: 'Chuyển khoản ngân hàng tới nơi nào có em',
  }
];

samplePaymentMethods.forEach(record => {
  record.createdAt = new Date();
  record.updatedAt = new Date();
});

module.exports = samplePaymentMethods;