const express = require("express");
const router = express.Router();
const createRoom = require("./createRoom");
const joinRoom = require("./joinRoom");
const myRooms = require("./myRooms");
const getMembers = require("./getMembers");
const authenticateToken = require("../../utilities/authenticateToken");
const chooseUsername = require("./chooseUsername");

router.post("/createRoom", authenticateToken, (req, res) => {
  createRoom(req, res);
});

router.post("/chooseUsername", authenticateToken, (req, res) => {
  chooseUsername(req, res);
});

router.post("/joinRoom", authenticateToken, (req, res) => {
  joinRoom(req, res);
});

router.get("/getRooms", authenticateToken, (req, res) => {
  myRooms(req, res);
});

router.get("/getMembers", (req, res) => {
  getMembers(req, res);
});

module.exports = router;
