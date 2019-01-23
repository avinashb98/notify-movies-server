const express = require('express');
const admin = require('../controllers/admin');
const validate = require('../controllers/validators/adminValidator');

const router = express.Router();

router.post('/', validate.signUp, admin.signUp);
router.post('/login', validate.login, admin.login);

module.exports = router;
