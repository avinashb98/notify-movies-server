const express = require('express');
const admin = require('../controllers/admin');

const router = express.Router();

router.post('/', admin.signUp);

module.exports = router;
