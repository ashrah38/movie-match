const express = require("express");
const router = express.Router();
const createRoom = require("./createRoom");
const joinRoom = require("./joinRoom");
const authenticateToken = require("../../utilities/authenticateToken");

router.post("/createRoom", authenticateToken, (req, res) => {
  createRoom(req, res);
});

router.get("/joinRoom", authenticateToken, (req, res) => {
  joinRoom(req, res);
});

module.exports = router;
