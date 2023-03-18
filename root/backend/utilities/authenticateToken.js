const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  console.log("Authenticating");
  // obtains the token from the browser cookie
  const token = req.headers.accesstoken;
  // if the token does not exist (user not logged in) sends a 401 code
  if (!token) {
    return res.sendStatus(401);
  }
  // if a token exists, continue
  try {
    // verifies the JWT
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
      console.log(user);
      // sends a 403 code if the JWT is expired or tampered with
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      req.user = user;
    });
    return next();
  } catch {
    // for any other errors, send a 403 code
    return res.sendStatus(403);
  }
};

module.exports = authenticateToken;
