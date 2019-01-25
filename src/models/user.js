const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  city: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
