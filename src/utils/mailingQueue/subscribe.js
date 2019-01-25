const amqp = require('amqplib/callback_api');
const sendEmail = require('../emailService');

amqp.connect(process.env.RABBIT_URL, (err, conn) => {
  conn.createChannel((error, channel) => {
    const q = 'mailingList';
    channel.assertQueue(q, { durable: false });
    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q);

    channel.consume(q, (msg) => {
      console.log(' [x] Received %s', msg.content.toString());
    }, { noAck: true });
  });
});
