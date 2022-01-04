const ejs = require('ejs');
const path = require('path');

module.exports = {
  generateOrderConfirmationMail: (order) =>
    ejs.renderFile(
      path.join(__dirname, '../mailer/templates/orderConfirmation.ejs'),
      { order }
    ),
  generateOrderSucceedMail: (order) =>
    ejs.renderFile(
      path.join(__dirname, '../mailer/templates/orderSuccess.ejs'),
      { order }
    ),
};
