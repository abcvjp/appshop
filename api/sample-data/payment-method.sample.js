const samplePaymentMethods = [
  {
    name: 'COD',
    detail: 'Payment by COD (Cash On Delivery)',
  },
  {
    name: 'Bank transfer',
    detail: 'Transfer money to our bank account\n(0123456789 - BIDV)',
  },
  {
    name: 'Visa Card',
    detail: 'Payment by Visa Card (international payment card)'
  }
];

samplePaymentMethods.forEach(record => {
  record.createdAt = new Date();
  record.updatedAt = new Date();
});

module.exports = samplePaymentMethods;