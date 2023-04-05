const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  imdbid: { type: String, unique: true },
  image: String,
  title: String,
  runtimeStr: String,
  genres: String,
  imDbRating: String,
  contentRating: String,
  imDbRatingVotes: String,
  plot: String,
  stars: String,
  releasedate: String,
  combined: String,
});

const Movies = mongoose.model("Movies", movieSchema);
module.exports = Movies;
