const Room = require("../../models/Room");
const Movies = require("../../models/Movies");
const User = require("../../models/User");
const getGroupMatches = async (req, res) => {
  console.log("Getting group matches");
  const roomCode = req.query.roomCode;
  let matchesList = [];
  const room = await Room.findOne({ roomCode: roomCode });
  const likedMovies = room.likedMovies;
  const matchesPromises = likedMovies.map(async (item) => {
    // more than one person has liked it.
    if (item.users.length > 1) {
      let matchesObject = { title: null, url: null, likedBy: item.users };
      const movie = await Movies.findOne({ imdbid: item.movieID });
      matchesObject.title = movie.title;
      matchesObject.url = movie.image;
      return matchesObject;
    }
  });
  Promise.all(matchesPromises)
    .then((matchesList) => {
      const filteredArray = matchesList.filter((item) => item != null);
      res.send(JSON.stringify(filteredArray));
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports = getGroupMatches;
