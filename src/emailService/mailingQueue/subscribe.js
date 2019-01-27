const amqp = require('amqplib/callback_api');
const sendEmail = require('../emailUtil');

amqp.connect(process.env.RABBIT_URL, (err, conn) => {
  conn.createChannel((error, channel) => {
    const q = 'mailingList';
    channel.assertQueue(q, { durable: false });
    channel.consume(q, (email) => {
      sendEmail(JSON.parse(email.content.toString()));
    }, { noAck: true });
  });
});
