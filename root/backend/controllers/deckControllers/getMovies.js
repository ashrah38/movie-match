const Room = require("../../models/Room");
const User = require("../../models/User");
const populateDeckAndSend = require("./populateDeckAndSend");

// receives room code as the input.
// this is triggered every time a user accesses the swiping screen.
// also triggered when the user runs out of movies to swipe.
const getMovies = async (req, res) => {
  // obtain room name and code from the request object
  const { roomCode } = req.body;
  let iteratorList = null;
  let iterator = null;
  let moviesToSend = null;
  let numItems = 0;
  // check to see if room.deck() is populated or not.
  User.findOne({ _id: req.user._id }, (error, user) => {
    if (error) res.sendStatus(500);
    // if the user is found
    iteratorList = user.deckPosTracker;
    return;
  })
    .clone()
    .then(() => {
      Room.findOne({ roomCode: roomCode }, async (error, room) => {
        // when this endpoint is triggered, the room must exist, thus, we only catch the database not responding error.
        if (error) res.sendStatus(500);
        // on finding the room, check if room.deck() is populated or not.
        if (room.deck == null || room.deck.length == 0) {
          // as the deck is not populated, trigger the population function
          // this fetches movies from the backend and adds them the deck
          numItems = 10;
          populateDeckAndSend(req, res, room, room.categories, numItems);
        } else {
          // the deck is not empty.
          iteratorList.forEach((item) => {
            if (item.roomCode == roomCode) {
              iterator = item.iterator;
            }
          });
          // the deck is not empty but the user is nearing the end
          if (room.deck.length - iterator < 10) {
            numItems = 10 - (room.deck.length - iterator);
            populateDeckAndSend(req, res, room, room.categories, numItems, iterator);
          }
          // the deck is not empty and we can send it to the user.
          else {
            // send 10 movies to the frontend, ahead of the iterator(so unswiped movies)
            moviesToSend = room.deck.slice(iterator, iterator + 10);
            return res.send(JSON.stringify(moviesToSend));
          }
        }
      });
    });
};

module.exports = getMovies;
