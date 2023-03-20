const crypto = require("crypto");
const Room = require("../../models/Room");
const User = require("../../models/User");

//creates room and returns room code
const createRoom = (req, res) => {
  console.log("Creating Room");

  if (req.body.length !== 0) {
    roomName = req.body.roomName;
    categories = req.body.categories;
    memberId = req.user._id;
  }
  //new room code
  const roomCode = crypto.randomBytes(3).toString("hex");
  roomCode = roomCode.toUpperCase();
  //new room object
  const newRoom = new Room({
    roomName: roomName,
    roomCode: roomCode,
    categories: categories,
    members: [memberId],
  });
  //creating document in db
  Room.create(newRoom, (err, room) => {
    if (err) {
      console.log("Error creating room", err);
      //11000 is for error for duplicate room code
      //rerun createRoom function if duplicate room code detected
      if (err.code === 11000) {
        createRoom(req, res);
      } else {
        res.sendStatus(500);
      }
    } else {
      //adding room to user document
      User.findById(memberId, (err, user) => {
        if (err || user === null) {
          console.log("Error finding user", err);
          if (!error) return res.sendStatus(501);
          else return res.sendStatus(500);
        } else {
          user.myRooms.push({
            roomName: roomName,
            roomCode: roomCode,
          });
          user.save();
          console.log("Created Room");
          res.send(JSON.stringify(roomCode));
        }
      });
    }
  });
};

module.exports = createRoom;
