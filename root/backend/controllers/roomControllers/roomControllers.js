const express = require("express")
const router = express.Router();
const createRoom = require("./createRoom")
const joinRoom = require("./joinRoom")

router.get("/createRoom", (req, res) => {
  createRoom(req, res);
})

router.get("/joinRoom", (req, res) => {
  joinRoom(req, res);
})

module.exports = router;
