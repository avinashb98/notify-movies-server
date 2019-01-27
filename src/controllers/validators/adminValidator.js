const Joi = require('joi');
const Admin = require('../../models/adminModel');

const adminWithEmailExists = async (email) => {
  let admin;
  try {
    admin = await Admin.findOne({ email });
  } catch (error) {
    throw error;
  }

  if (admin) {
    return true;
  }
  return false;
};

const ValidateSignup = Joi.object().keys({
  name: Joi.string().min(2).max(30),
  password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).required(),
  email: Joi
    .string()
    .regex(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)
    .required()
});

const signUp = async (req, res, next) => {
  const { error, value } = ValidateSignup.validate(req.body);
  if (error) {
    res.status(400).json({
      message: `Invalid input format. ${error.message}`
    });
    return;
  }

  if (await adminWithEmailExists(value.email)) {
    res.status(400).json({
      message: 'This email is associated with an existing admin'
    });
    return;
  }

  req.parsed = value;
  next();
};


const ValidateLogin = Joi.object().keys({
  password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).required(),
  email: Joi
    .string()
    .regex(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)
    .required()
});

const login = async (req, res, next) => {
  const { error, value } = ValidateLogin.validate(req.body);
  if (error) {
    res.status(400).json({
      message: `Invalid input format. ${error.message}`
    });
    return;
  }

  req.body = value;
  next();
};

const ValidateCreateUser = Joi.object().keys({
  name: Joi.string().min(3).required(),
  email: Joi
    .string()
    .regex(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)
    .required(),
  city: Joi.string().required()
});

const createUser = async (req, res, next) => {
  const { error, value } = ValidateCreateUser.validate(req.body);
  if (error) {
    res.status(400).json({
      message: `Invalid input format. ${error.message}`
    });
    return;
  }

  req.body = value;
  next();
};

const ValidateAddMovie = Joi.object().keys({
  name: Joi.string().min(3).required(),
  director: Joi.string().min(3),
  genre: Joi.string().min(3)
});

const addMovie = async (req, res, next) => {
  const { error, value } = ValidateAddMovie.validate(req.body);
  if (error) {
    res.status(400).json({
      message: `Invalid input format. ${error.message}`
    });
    return;
  }

  req.body = value;
  next();
};

const ValidateAddTheatre = Joi.object().keys({
  name: Joi.string().min(3).required(),
  city: Joi.string().min(3).required(),
  movie: Joi.string().min(3)
});

const addTheatre = async (req, res, next) => {
  const { error, value } = ValidateAddTheatre.validate(req.body);
  if (error) {
    res.status(400).json({
      message: `Invalid input format. ${error.message}`
    });
    return;
  }

  req.body = value;
  next();
};

const ValidateAddCity = Joi.object().keys({
  name: Joi.string().min(3).required()
});

const addCity = async (req, res, next) => {
  const { error, value } = ValidateAddCity.validate(req.body);
  if (error) {
    res.status(400).json({
      message: `Invalid input format. ${error.message}`
    });
    return;
  }

  req.body = value;
  next();
};

const ValidateMailSome = Joi.object().keys({
  emailList: Joi.array().required(),
  subject: Joi.string().min(3).required(),
  text: Joi.string().min(3).required()
});

const mailSome = async (req, res, next) => {
  const { error, value } = ValidateMailSome.validate(req.body);
  if (error) {
    res.status(400).json({
      message: `Invalid input format. ${error.message}`
    });
    return;
  }

  req.body = value;
  next();
};

const ValidateMailAll = Joi.object().keys({
  movie: Joi.string().min(3).required()
});

const mailAll = async (req, res, next) => {
  const { error, value } = ValidateMailAll.validate(req.body);
  if (error) {
    res.status(400).json({
      message: `Invalid input format. ${error.message}`
    });
    return;
  }

  req.body = value;
  next();
};

module.exports = {
  signUp,
  login,
  createUser,
  addMovie,
  addTheatre,
  addCity,
  mailSome,
  mailAll
};
