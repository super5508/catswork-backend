const nodemailer = require('nodemailer');
const { NODE_EMAILER_SERVICE, NODE_EMAILER_EMAIL, NODE_EMAILER_PASSWORD} = require('./../config')


const sendEmail = (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: NODE_EMAILER_SERVICE,
    auth: {
      user: NODE_EMAILER_EMAIL,
      pass: NODE_EMAILER_PASSWORD
    }
  });

  const mailOptions = {
    from: NODE_EMAILER_EMAI,
    to: to,
    subject: subject,
    text: text
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return info.response
    }
  });
}

module.exports = sendEmail