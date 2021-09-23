const testClient = require('../../testClient');
const samplePaymentMethods = require('../../../sample-data/payment-method.sample');
const { queryInterface } = require('../../../models');
const { paymentMethodMatcher } = require('../../matchers');

test('GET /payment/payment_method', async () => {
  await testClient
    .get('/payment/payment_method')
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data.length).toEqual(samplePaymentMethods.length);
      expect(res.body.data).toEqual(
        expect.arrayContaining([paymentMethodMatcher])
      );
    });
});
