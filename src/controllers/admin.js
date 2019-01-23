const passport = require('passport');
const Admin = require('../models/adminModel');

const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  const adminData = { email };
  if (name) adminData.name = name;

  let newAdmin;
  try {
    newAdmin = new Admin(adminData);
    await newAdmin.setPassword(password);
    await newAdmin.save();
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
  }

  res.status(201).json({
    message: 'New Admin Successfuly Created',
    data: {
      name: newAdmin.name,
      email: newAdmin.email
    }
  });
};

const login = async (req, res) => {
  passport.authenticate('local', { session: false }, (err, admin, info) => {
    if (err) {
      res.status(403).json({
        message: 'Unable to authenticate admin',
        data: {}
      });
      return;
    }

    if (!admin) {
      res.status(404).json({
        message: 'Authentication failed',
        data: {}
      });
      return;
    }

    const user = admin;
    user.token = admin.generateJWT();

    res.status(200).json({
      message: 'Login Successful',
      data: { user: admin.toAuthJSON() }
    });
  })(req, res);
};

module.exports = {
  signUp,
  login
};
