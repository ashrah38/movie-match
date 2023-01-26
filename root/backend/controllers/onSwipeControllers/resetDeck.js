const Room = require('../../models/Room');

const resetDeck = (req, res) => {
  console.log("Reset Deck")

  if(req.body.length !== 0){
    userID = req.user._id
    roomID = req.body.roomID
  }

  Room.findOne({_id: roomID}, (error, room) => {
    if (error || user === null) {
      if(!error) return res.sendStatus(501);
      else return res.sendStatus(500);
    } else {
      //get the likedMovies in the room and remove user from array
      if(room.likedMovies.length !== 0) {
        for(var i = 0; i < room.likedMovies.length; i++){
          if(room.likedMovies[i].includes(userID)){
            room.likedMovies[i] = room.likedMovies[i].filter(user => user !== userID);
          }
        }
      }
      room.save();
    }
  })
  res.sendStatus(200);
}

module.exports=resetDeck