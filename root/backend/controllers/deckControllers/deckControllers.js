const express = require("express");
const router = express.Router();
const authenticateToken = require("../../utilities/authenticateToken");
const getMovies = require("./getMovies");

router.post("/getMovies", authenticateToken, (req, res) => {
  getMovies(req, res);
});

module.exports = router;
