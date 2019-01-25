const mongoose = require('mongoose');

const { Schema } = mongoose;
const MovieSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  director: {
    type: String
  },
  genre: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', MovieSchema);
