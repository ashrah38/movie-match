const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomCode: {type: String, unique: true},
  roomName: {type: String},
  categories: {type: Array},
  members: {type: Array},
  likedMovies: {type: Array},
  createdAt: {type: Date},
  updatedAt: {type: Date},
})

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;