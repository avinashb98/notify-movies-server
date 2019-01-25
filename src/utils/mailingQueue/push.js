const amqp = require('amqplib/callback_api');

amqp.connect(process.env.RABBIT_URL, (err, conn) => {
  conn.createChannel((error, channel) => {
    const q = 'mailingList';
    channel.assertQueue(q, { durable: false });
    channel.sendToQueue(q, Buffer.from('Hello World!'));
    console.log(' [x] Sent \'Hello World!\'');
  });
  setTimeout(() => { conn.close(); }, 1000);
});
