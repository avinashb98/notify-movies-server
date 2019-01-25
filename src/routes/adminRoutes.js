const express = require('express');
const admin = require('../controllers/admin');
const validate = require('../controllers/validators/adminValidator');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/', validate.signUp, admin.signUp);
router.post('/login', validate.login, admin.login);

// Verify JWT Token
router.use(verifyToken);

// Protected Routes

// Create User
router.post('/createUser', admin.createUser);

module.exports = router;
