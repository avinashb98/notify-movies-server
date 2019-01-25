const mongoose = require('mongoose');

const { Schema } = mongoose;

const CitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  theatres: [{
    type: Schema.Types.ObjectId,
    ref: 'Theatre'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('City', CitySchema);
