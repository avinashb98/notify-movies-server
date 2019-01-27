const express = require('express');
const admin = require('../controllers/admin');
const validate = require('../controllers/validators/adminValidator');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/', validate.signUp, admin.signUp);
router.post('/login', validate.login, admin.login);

/**
 * Protected Routes
 */

// Verify JWT Token
router.use(verifyToken);

// Create a new User
router.post('/createUser', admin.createUser);

// Get list of users
router.get('/users', admin.getUsers);

// Add a City
router.post('/city', admin.addCity);

// Create a Movie Record
router.post('/movie', admin.createMovie);

// Create a Movie Record
router.post('/theatre', admin.createTheatre);

// Send Mail to a list of users emails
router.post('/mail/some', admin.mailSome);

// Send mail to users in city with specified movie
router.post('/mail/all', admin.mailAll);

module.exports = router;
