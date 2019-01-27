const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  pool: true,
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'vl5o45vmaasb5yas@ethereal.email',
    pass: 's5GdbwjwEwJq7ZtYCK'
  }
});

const sendMail = async (emailData) => {
  const mailOptions = {
    from: emailData.sender,
    to: emailData.recipient,
    subject: emailData.subject,
    html: emailData.body
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent');
    }
  });
};

module.exports = sendMail;
