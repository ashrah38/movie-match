const Room = require('../../models/Room');

const getPersonalMatches = (req, res) => {
  //need userID and roomID
  if(req.body.length !== 0){
    userID = req.user._id
    roomID = req.body.roomID
  }

  let personalMatches = [];
  Room.findOne({_id: roomID}, (error, room) => {
    if (error || user === null) {
      if(!error) return res.sendStatus(501);
      else return res.sendStatus(500);
    } else {
      if(!room.likedMovies.length !== 0){
        for(var i = 0; i < room.likedMovies.length; i++){
          if(room.likedMovies[i].includes(userID)){
            personalMatches.push(Object.keys(room.likedMovies)[i])
          }
        }
      }
    }
  })
  res.send(personalMatches)
}

module.exports = getPersonalMatches;