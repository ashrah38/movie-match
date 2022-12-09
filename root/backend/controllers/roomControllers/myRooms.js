const User = require('../../models/User');

const myRooms = (req, res) => {
  console.log("My Rooms")

  User.findOne({ _id: req.body.userId }, (error, user) => {
    if (error || user === null) {
      if (!error) return res.sendStatus(501);
      else return res.sendStatus(500);
    } else {
      const yourRooms = user.myRooms;
      res.send(yourRooms);
    }
  });
}

module.exports = myRooms;