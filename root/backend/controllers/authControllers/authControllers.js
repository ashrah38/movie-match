const express = require("express");
const router = express.Router();
const loginUser = require("./loginUser");
const registerUser = require("./registerUser");
const logoutUser = require("./logoutUser");
const authenticateToken = require("../../utilities/authenticateToken");

router.post("/register", async (req, res) => {
  registerUser(req, res);
});

router.post("/login", (req, res) => {
  loginUser(req, res);
});

router.get("/logout", authenticateToken, (req, res) => {
  logoutUser(req, res);
});

module.exports = router;
