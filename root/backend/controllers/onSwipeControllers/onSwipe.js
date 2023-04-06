const User = require("../../models/User");
const Room = require("../../models/Room");

const onSwipe = (req, res) => {
  if (req.body.length !== 0) {
    userID = req.user._id;
    username = req.user.username;
    roomCode = req.body.roomCode;
    movieID = req.body.movieID;
    swipeDirection = req.body.swipeDirection;
  }

  if (swipeDirection == 1) {
    likedMovie(res, userID, roomCode, movieID);
  } else if (swipeDirection == 0) {
    dislikedMovie(res, userID, roomCode);
  } else if (swipeDirection == 2) {
    likesButHasSeen(res, userID, roomCode, movieID);
  }
};

const likedMovie = (res, userID, roomCode, movieID) => {
  //add to user document - likedMovies, and increment the iterator
  User.findOneAndUpdate(
    { _id: userID, "deckPosTracker.roomCode": roomCode },
    { $inc: { "deckPosTracker.$.iterator": 1 }, $push: { likedMovies: movieID } }
  )
    .then()
    .catch((err) => console.log(err));

  //add to room document, likedMovies (if exists, add the userId, else create the array)
  Room.findOne({ roomCode: roomCode, likedMovies: { $elemMatch: { movieID: movieID } } }, (error, room) => {
    if (error) return res.sendStatus(500);
    if (room) {
      Room.findOneAndUpdate(
        { roomCode: roomCode, "likedMovies.movieID": movieID },
        { $push: { "likedMovies.$.users": username } }
      )
        .then()
        .catch((err) => console.log(err));
    } else {
      Room.findOneAndUpdate({ roomCode: roomCode }, { $push: { likedMovies: { movieID: movieID, users: [username] } } })
        .then()
        .catch((err) => console.log(err));
    }
  });
};

const dislikedMovie = (res, userID, roomCode) => {
  User.findOneAndUpdate({ _id: userID, "deckPosTracker.roomCode": roomCode }, { $inc: { "deckPosTracker.$.iterator": 1 } })
    .then(() => {
      return res.sendStatus(200);
    })
    .catch((error) => console.log(error));
};

const likesButHasSeen = (res, userID, movieID) => {
  //add to user document - likedMovies, and increment the iterator
  User.findOneAndUpdate(
    { _id: userID, "deckPosTracker.roomCode": roomCode },
    { $inc: { "deckPosTracker.$.iterator": 1 }, $push: { likedMovies: movieID } }
  )
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err));
};

module.exports = onSwipe;
