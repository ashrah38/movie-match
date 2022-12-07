const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String},
  password: {type: String},
  likedMovies: {type: Array},
  swipedMovies: {type: Array},
  matches: {type: Array},
  myRooms: {type: Array},
  createdAt: {type: Date},
  updatedAt: {type: Date},
  username: {type: String},
})

const User = mongoose.model('User', userSchema);

module.exports = User;