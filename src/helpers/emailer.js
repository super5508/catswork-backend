const nodemailer = require('nodemailer');
const { NODE_EMAILER_SERVICE, NODE_EMAILER_EMAIL, NODE_EMAILER_PASSWORD} = require('./../config')
const ErrorTypes = require('./../enums/errorTypes')

const sendEmail = (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: NODE_EMAILER_SERVICE,
    auth: {
      user: NODE_EMAILER_EMAIL,
      pass: NODE_EMAILER_PASSWORD
    }
  });

  const mailOptions = {
    from: NODE_EMAILER_EMAIL,
    to: to,
    subject: subject,
    text: text
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error(ErrorTypes.AUTHENTICATION_OTP_MESSSGE_PROBLEM)
    } else {
      return info.response
    }
  });
}

module.exports = sendEmail