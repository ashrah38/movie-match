const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const loginUser = (req, res) => {
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
          const toSend = { _id: user.id, email: user.email, password: user.password };
          const accessToken = jwt.sign(JSON.stringify(toSend), process.env.JWT_ACCESS_SECRET);
          // save the access token in an http only cookie
          res.cookie("accessToken", accessToken, { httpOnly: true });
          return res.status(200).json(toSend);
        }
      });
    }
  });
};

module.exports = loginUser;
