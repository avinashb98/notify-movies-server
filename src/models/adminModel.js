const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const AdminSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

AdminSchema.methods.setPassword = (password) => {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(
    password, this.salt, 10000, 512, 'sha512'
  ).toString('hex');
};

AdminSchema.methods.validatePassword = (password) => {
  const hash = crypto.pbkdf2Sync(
    password, this.salt, 10000, 512, 'sha512'
  ).toString('hex');
  return this.hash === hash;
};

AdminSchema.methods.generateJWT = () => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 1);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, process.env.JWT_SECRET);
};

AdminSchema.methods.toAuthJSON = () => ({
  _id: this._id,
  email: this.email,
  token: this.generateJWT(),
});

module.exports = mongoose.model('Admin', AdminSchema);
