const Movies = require("../../models/Movies");

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const parseMovieObject = (movie) => {
  const parsedMovieObject = {
    imdbid: movie.imdbid,
    image: movie.image,
    title: movie.title,
    imDbRating: movie.imDbRating,
    contentRating: movie.contentRating,
  };
  return parsedMovieObject;
};

const convertToArray = (MongoObject) => {
  let toSend = [];
  MongoObject.forEach((item) => toSend.push(item));
  return toSend;
};

// takes in an array of upto three categories, and returns an array of 100 items everytime.
// once we retrieve these items, we push numItems of these into movie deck, but only if the deck does not already contain the movie.
const populateDeckAndSend = (req, res, room, categories, numItems, iterator = null) => {
  categories = convertToArray(categories);
  let itemsPushed = 0;
  // if category length is 3, return movies matching at least 2/3 categories.
  if (categories.length == 3) {
    Movies.find({
      $or: [
        { genres: { $regex: categories[0] }, genres: { $regex: categories[1] } },
        { genres: { $regex: categories[0] }, genres: { $regex: categories[2] } },
        { genres: { $regex: categories[1] }, genres: { $regex: categories[2] } },
      ],
    })
      .limit(50)
      .then((results) => {
        if (results.length < 50) {
          // if less than 50 movies found in the database, add Action as the last category.
          categories[2] = "Action";
          populateDeckAndSend(req, res, room, categories, numItems, iterator);
          return;
        } else return convertToArray(results);
      })
      .then((results) => {
        if (results != undefined) {
          for (let i = 0; i < results.length; i++) {
            const randomIndex = getRandomInt(0, 49);
            // parsedItem is the object to be added, if it does not already exist.
            const parsedItem = parseMovieObject(results[randomIndex]);
            if (!room.deck.find((obj) => obj.imdbid == parsedItem.imdbid)) {
              room.deck.push(parsedItem);
              itemsPushed += 1;
              if (itemsPushed == numItems) {
                room
                  .save()
                  .then()
                  .catch((err) => console.log(err))
                  .finally(() => {});
                break;
              }
            }
          }
          return room.deck;
        } else {
          return;
        }
      })
      .then((deck) => {
        if (deck != undefined) {
          moviesToSend = deck.slice(iterator);
          return res.send(JSON.stringify(moviesToSend));
        } else return;
      });
  } else {
    // proceed normally (for two categories and fewer)
    if (categories.length == 1) categories.push(categories[0]);
    Movies.find({ $or: [{ genres: { $regex: categories[0] } }, { genres: { $regex: categories[1] } }] })
      .limit(50)
      .then((results) => {
        if (results.length < 50) {
          // if less than 100 movies found in the database, add Action as the last category.
          categories[2] = "Action";
          populateDeckAndSend(req, res, room, categories, numItems, iterator);
          return;
        } else return convertToArray(results);
      })
      .then((results) => {
        if (results != undefined) {
          for (let i = 0; i < results.length; i++) {
            const randomIndex = getRandomInt(0, 49);
            const parsedItem = parseMovieObject(results[randomIndex]);
            if (!room.deck.find((obj) => obj.imdbid == parsedItem.imdbid)) {
              room.deck.push(parsedItem);
              itemsPushed += 1;
              if (itemsPushed == numItems) {
                room
                  .save()
                  .then()
                  .catch((err) => console.log(err));
                break;
              }
            }
          }
          return room.deck;
        } else return;
      })
      .then((deck) => {
        if (deck != undefined) {
          moviesToSend = deck.slice(iterator);
          return res.send(JSON.stringify(moviesToSend));
        } else return;
      });
  }
};

module.exports = populateDeckAndSend;
