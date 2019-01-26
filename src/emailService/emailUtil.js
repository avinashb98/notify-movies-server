const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendMail = async (emailData) => {
  const mailOptions = {
    from: emailData.sender,
    to: emailData.recipient,
    subject: 'Movie Details',
    html: '<p>Inception is here</p>'
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendMail;
