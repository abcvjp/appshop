const { sendMail } = require('../transporter');
const {
  generateOrderSucceedMail
} = require('../../helpers/mailContentGenerator.helper');

module.exports = async (job) => {
  const { order } = job.data;
  const content = await generateOrderSucceedMail(order);
  sendMail({
    to: order.email,
    subject: 'Techmall has recieved your order',
    html: content
  });
};
