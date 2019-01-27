const pushToQueue = require('./mailingQueue/push');

const emailService = (emailData) => {
  pushToQueue(emailData);
};

module.exports = emailService;
