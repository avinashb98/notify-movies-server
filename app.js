const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const RateLimit = require('express-rate-limit');
require('dotenv').config();

// mongodb config
require('./config/db');

// Initializing express app
const app = express();

// Adds helmet middleware
app.use(helmet());

// Etag disable
app.set('etag', false);

// Body Parser Configuration
app.use(bodyParser.json({ // to support JSON-encoded bodies
  limit: '1mb'
}));

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  limit: '1mb',
  extended: true
}));

// Using CORS
app.use(cors());

const limiter = new RateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 50, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

//  apply to all requests
app.use(limiter);

app.use(bodyParser.urlencoded({ extended: false }));

// Router Initialization
app.get('/api/', (req, res) => {
  res.status(200).json({
    msg: 'Welcome to Movie Notifications API'
  });
});

module.exports = app;
