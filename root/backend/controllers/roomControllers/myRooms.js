const User = require("../../models/User");

const myRooms = (req, res) => {
  console.log("My Rooms");

  User.findOne({ _id: req.user._id }, (error, user) => {
    if (error || user === null) {
      if (!error) return res.sendStatus(501);
      else return res.sendStatus(500);
    } else {
      const yourRooms = user.myRooms;
      let iterator = 1;
      yourRooms.forEach((room) => {
        room.key = iterator;
        iterator += 1;
      });
      res.send(JSON.stringify(yourRooms));
    }
  });
};

module.exports = myRooms;
