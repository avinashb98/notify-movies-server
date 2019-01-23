const express = require('express');
const admin = require('../controllers/admin');

const router = express.Router();

router.post('/', admin.signUp);
router.post('/login', admin.login);

module.exports = router;
