const config = require('../config');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: config.get('mailer.service'),
  auth: {
    user: config.get('mailer.user'),
    pass: config.get('mailer.password') // naturally, replace both with your real credentials or an application-specific password
  }
});

const sendMail = ({ to, subject, text, html }, onError, onSuccess) => {
  transporter.sendMail(
    {
      from: config.get('mailer.user'),
      to,
      subject,
      text,
      html
    },
    function (error, info) {
      if (error) {
        console.log(error);
        if (onError) onError();
      } else {
        console.log('Email sent: ' + info.response);
        if (onSuccess) onSuccess();
      }
    }
  );
};

module.exports = {
  transporter,
  sendMail
};
