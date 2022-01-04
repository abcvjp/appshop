const { sendMail } = require('../transporter');
const {
  generateForgotPasswordMail
} = require('../../helpers/mailContentGenerator.helper');

module.exports = async (job) => {
  const { user, new_password } = job.data;
  const content = await generateForgotPasswordMail({ user, new_password });
  sendMail({
    to: user.email,
    subject: 'Forgot password request at Techmall',
    html: content
  });
};
