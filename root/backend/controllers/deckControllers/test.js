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
        return room;
      })
        .clone()
        .then((room) => {
          // on finding the room, check if room.deck() is populated or not.
          if (room.deck == null || room.deck.length == 0) {
            // as the deck is not populated, trigger the population function
            // this fetches movies from the backend and adds them the deck
            numItems = 10;
            populateDeck(room, numItems);
          }
        });
    });
};
