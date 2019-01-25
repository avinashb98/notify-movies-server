const passport = require('passport');
const Admin = require('../models/adminModel');
const User = require('../models/user');

const signUp = async (req, res) => {
  const { email, password, name } = req.parsed;
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
    return;
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
  passport.authenticate('local', { session: false }, (err, admin) => {
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

const createUser = async (req, res) => {
  const { name, city, email } = req.body;
  const adminId = req.decoded.id;
  let newUser;
  try {
    newUser = await User.create({
      name, city, email, createdBy: adminId
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(201).json({
    message: 'New User Successfully created',
    data: {
      user: {
        name: newUser.name,
        email: newUser.email,
        city: newUser.city
      }
    }
  });
};

const getUsers = async (req, res) => {
  let users;
  try {
    users = await User.find({}, { name: 1, city: 1, email: 1 }).lean();
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  if (users.length === 0) {
    res.status(404).json({
      message: 'No users found',
      data: {}
    });
  }

  res.status(200).json({
    message: 'List of Users',
    data: { users }
  });
};

module.exports = {
  signUp,
  login,
  createUser,
  getUsers
};
