const passport = require('passport');
const Admin = require('../models/adminModel');
const User = require('../models/user');
const Movie = require('../models/movie');
const Theatre = require('../models/theatre');
const City = require('../models/city');
const emailService = require('../emailService');

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
    newTheatre = await Theatre.create({ name, city, currentMovie: movie });
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

const mailSome = async (req, res) => {
  const { emailList, subject, text } = req.body;
  emailList.forEach((email) => {
    const emailData = {
      sender: 'vl5o45vmaasb5yas@ethereal.email',
      recipient: email,
      subject,
      body: text
    };
    emailService(emailData);
  });
  res.status(200).json({
    message: 'Mail request received',
    data: {}
  });
};

const mailAll = async (req, res) => {
  const { movie } = req.body;
  let citiesWithMovie;
  let userEmails;
  try {
    citiesWithMovie = await Theatre.aggregate([
      { $match: { currentMovie: movie } },
      { $group: { _id: '$city' } }
    ]);
    const queryArray = [];
    citiesWithMovie.forEach((cityData) => {
      queryArray.push({ city: cityData._id });
    });
    userEmails = await User.find({ $or: queryArray }, { email: 1 });
    res.status(200).json({
      message: 'Request Received',
      data: {}
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  userEmails.forEach((emailObj) => {
    const emailData = {
      sender: 'vl5o45vmaasb5yas@ethereal.email',
      recipient: emailObj.email,
      subject: `${movie} Update`,
      body: `Hi, ${movie} is showing at theatres in your city`
    };
    emailService(emailData);
  });
};

module.exports = {
  signUp,
  login,
  createUser,
  getUsers,
  createMovie,
  createTheatre,
  addCity,
  mailSome,
  mailAll
};
