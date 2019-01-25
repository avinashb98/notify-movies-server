const mongoose = require('mongoose');

const { Schema } = mongoose;

const TheatreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  currentMovie: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

TheatreSchema.post('save', function () {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Theatre', TheatreSchema);
