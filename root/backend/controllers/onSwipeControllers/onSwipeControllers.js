const express = require("express");
const router = express.Router();
const authenticateToken = require("../../utilities/authenticateToken");

const onSwipe = require("./onSwipe");
const resetDeck = require("./resetDeck");
const getPersonalMatches = require("./getPersonalMatches");
const getGroupMatches = require("./getGroupMatches");

router.post("/onSwipe", authenticateToken, (req, res) => {
  onSwipe(req, res);
});

router.post("/resetDeck", authenticateToken, (req, res) => {
  resetDeck(req, res);
});

router.get("/getPersonalMatches", authenticateToken, (req, res) => {
  getPersonalMatches(req, res);
});

router.get("/getGroupMatches", (req, res) => {
  getGroupMatches(req, res);
});

module.exports = router;
