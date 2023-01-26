const Room = require('../../models/Room');

const getGroupMatches = (req, res) => {
  //need roomID
  if(req.body.length !== 0){
    roomID = req.body.roomID
  }

  let getGroupMatches = [];
  Room.findOne({_id: roomID}, (error, room) => {
    if (error || user === null) {
      if(!error) return res.sendStatus(501);
      else return res.sendStatus(500);
    } else {
      if(!room.likedMovies.length !== 0){
        for(var i = 0; i < room.likedMovies.length; i++){
          //might need to do this differently if we want to sort
          //could use a type of map or heap
          if(room.likedMovies[i].length >= 2){
            getGroupMatches.push(Object.keys(room.likedMovies)[i])
          }
        }
      }
    }
  })
  res.send(getGroupMatches)
}

module.exports = getGroupMatches;