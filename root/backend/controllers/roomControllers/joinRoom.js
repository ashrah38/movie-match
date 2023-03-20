const Room = require("../../models/Room");
const User = require("../../models/User");

//verifies room exists and adds user to the room
const joinRoom = (req, res) => {
  console.log("Join Room");

  const { roomCode } = req.body;
  let roomName = "";
  Room.findOne({ roomCode: roomCode }, (error, room) => {
    if (error || room === null) {
      if (!error) return res.sendStatus(501);
      else return res.sendStatus(500);
    } else {
      roomName = room.roomName;
      if (!room.members.includes(req.user._id)) {
        room.members.push(req.user._id);
      }
      room.save();
      // once the room is found, then query for User.
      User.findOne({ _id: req.user._id }, (error, user) => {
        if (error || user === null) {
          if (!error) return res.sendStatus(501);
          else return res.sendStatus(500);
        } else {
          if (!user.myRooms.some((doc) => doc.roomCode === roomCode)) {
            user.myRooms.push({
              roomName: roomName,
              roomCode: roomCode,
            });
            user.save();
          }
          res.status(200).send(JSON.stringify(room));
        }
      });
    }
  });
};

module.exports = joinRoom;
