const Room = require("../../models/Room");
const User = require("../../models/User");

const getMembers = async (req, res) => {
  console.log("getting members");
  const roomCode = req.query.roomCode;
  let usernamesToSend = [];
  const room = await Room.findOne({ roomCode: roomCode });
  const listOfUsers = room.members;
  const listOfUsersPromises = listOfUsers.map(async (item) => {
    // more than one person has liked it.
    const user = await User.findOne({ _id: item });
    usernamesToSend.push(user.username);
    return;
  });

  Promise.all(listOfUsersPromises)
    .then(() => {
      console.log(usernamesToSend);
      res.send(JSON.stringify(usernamesToSend));
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports = getMembers;
