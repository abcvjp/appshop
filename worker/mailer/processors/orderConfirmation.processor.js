const config = require('../../config');
const { sendMail } = require('../transporter');
const {
  generateOrderConfirmationMail
} = require('../../helpers/mailContentGenerator.helper');

module.exports = async (job) => {
  const { order } = job.data;
  const content = await generateOrderConfirmationMail(order);
  sendMail({
    to: order.email,
    subject: 'Your order is confirmed!',
    html: content
  });
};
