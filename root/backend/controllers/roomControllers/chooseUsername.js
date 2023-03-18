const crypto = require("crypto");
const Room = require("../../models/Room");
const User = require("../../models/User");

//creates room and returns room code
const chooseUsername = (req, res) => {
  console.log("Saving Username");
  if (req.body.length !== 0) {
    username = req.body.username;
  }
  User.findOne({ email: req.user.email }, (error, user) => {
    if (error || user === null) {
      if (!error) return res.sendStatus(501);
      else return res.sendStatus(500);
    } else {
      console.log(user);
      user.username = username;
      user.save();
    }
  });
  res.send(JSON.stringify(req.user));
};

module.exports = chooseUsername;
