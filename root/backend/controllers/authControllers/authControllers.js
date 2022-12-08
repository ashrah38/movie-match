const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  // obtains the email and password from the submitted form
  const { email, password } = req.body;
  // creates a new user, and assigns username as email for now
  newUser = await new User({
    email: email,
    username: email,
    password: password,
  });
  // saves the user to the database
  newUser.save((error) => {
    if (error) {
      // if the email or username already exists in the database, we return a 501 code
      if (error.code === 11000) return res.sendStatus(501);
      // if any other error occurs, we send back 500 code
      else return res.sendStatus(500);
    } else {
      // upon successful registration, create an access token
      const accessToken = jwt.sign(
        newUser.toJSON(),
        process.env.JWT_ACCESS_SECRET
      );
      // save the access token in an http only cookie
      return res
        .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
        .status(200)
        .send({ message: "Registered" });
    }
  });
});

router.post("/login", (req, res) => {
  // obtains the email and password from the submitted form
  const { email, password } = req.body;
  // looks for the user in the database
  User.findOne({ email: email }, (error, user) => {
    // throw an error if a user does not exist (501), or the database does not respond (500).
    if (error || user === null) {
      if (!error) return res.sendStatus(501);
      else return res.sendStatus(500);
    } else {
      // authenticate the credentials
      bcrypt.compare(password, user.password, (error, result) => {
        // if incorrect credentials, send back a 502 code
        if (!result) return res.sendStatus(502);
        else {
          // if credentials verified, create a JWT
          const accessToken = jwt.sign(
            user.toJSON(),
            process.env.JWT_ACCESS_SECRET
          );
          // save the access token in an http only cookie
          return res
            .cookie("accessToken", accessToken, {
              httpOnly: true,
              secure: true,
            })
            .status(200)
            .send({ message: "Logged in" });
        }
      });
    }
  });
});

module.exports = router;
