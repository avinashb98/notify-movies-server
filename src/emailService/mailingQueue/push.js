const amqp = require('amqplib/callback_api');

const pushEmailToQueue = (emailData) => {
  amqp.connect(process.env.RABBIT_URL, (err, conn) => {
    if (err) {
      console.log(err);
      return;
    }
    conn.createChannel((error, channel) => {
      const q = 'mailingList';
      channel.assertQueue(q, { durable: false });
      channel.sendToQueue(q, Buffer.from(JSON.stringify(emailData)));
    });
    setTimeout(() => { conn.close(); }, 1000);
  });
};

module.exports = pushEmailToQueue;
