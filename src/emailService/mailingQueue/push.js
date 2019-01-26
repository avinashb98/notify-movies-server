const amqp = require('amqplib/callback_api');

const pushEmailToQueue = (emailData) => {
  const emailJSON = JSON.stringify(emailData);
  amqp.connect(process.env.RABBIT_URL, (err, conn) => {
    conn.createChannel((error, channel) => {
      const q = 'mailingList';
      channel.assertQueue(q, { durable: false });
      channel.sendToQueue(q, emailJSON);
    });
    setTimeout(() => { conn.close(); }, 1000);
  });
};

module.exports = pushEmailToQueue;
