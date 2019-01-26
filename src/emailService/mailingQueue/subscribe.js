const amqp = require('amqplib/callback_api');
const sendEmail = require('../emailUtil');

amqp.connect(process.env.RABBIT_URL, (err, conn) => {
  conn.createChannel((error, channel) => {
    const q = 'mailingList';
    channel.assertQueue(q, { durable: false });
    channel.consume(q, (jsonEmail) => {
      const emailData = JSON.parse(jsonEmail);
      sendEmail(emailData);
    }, { noAck: true });
  });
});
