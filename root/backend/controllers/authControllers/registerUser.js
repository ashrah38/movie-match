const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  // obtains the email and password from the submitted form
  const { email, password } = req.body;

  // hash the received password
  const hashedPassword = await bcrypt.hash(password, 10);
  // creates a new user, and assigns username as email for now
  newUser = await new User({
    email: email,
    username: email,
    password: hashedPassword,
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
      const accessToken = jwt.sign(newUser.toJSON(), process.env.JWT_ACCESS_SECRET);
      // save the access token in an http only cookie
      return res.cookie("accessToken", accessToken, { httpOnly: true }).sendStatus(200);
    }
  });
};

module.exports = registerUser;
