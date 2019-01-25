const passport = require('passport');
const Admin = require('../models/adminModel');
const User = require('../models/user');
const Movie = require('../models/movie');
const Theatre = require('../models/theatre');
const City = require('../models/city');

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

const createMovie = async (req, res) => {
  const { name, director, genre } = req.body;
  let newMovie;
  try {
    newMovie = await Movie.create({
      name, director, genre
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(201).json({
    message: 'New Movie Successfully created',
    data: {
      user: {
        name: newMovie.name,
        director: newMovie.director,
        genre: newMovie.genre
      }
    }
  });
};

const createTheatre = async (req, res) => {
  const { name, city, movie } = req.body;
  let newTheatre;
  try {
    newTheatre = await Theatre.create({ name, city, movie });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(201).json({
    message: 'New Theatre Successfully Added',
    data: {
      user: {
        name: newTheatre.name,
        city: newTheatre.city,
        movie: newTheatre.movie
      }
    }
  });

  City.findOneAndUpdate(
    { name: city },
    { $push: { theatres: { theatre: newTheatre._id } } }
  )
    .then(() => {
      console.log(`Theatre ${newTheatre.name} successfully added to ${city}`);
    })
    .catch(console.log);
};

const addCity = async (req, res) => {
  const { name } = req.body;
  let newCity;
  try {
    newCity = await City.create({ name });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(201).json({
    message: 'New City Successfully Added',
    data: {
      user: { name: newCity.name }
    }
  });
};

module.exports = {
  signUp,
  login,
  createUser,
  getUsers,
  createMovie,
  createTheatre,
  addCity
};
