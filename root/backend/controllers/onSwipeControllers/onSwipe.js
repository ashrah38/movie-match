const User = require('../../models/User');
const Room = require('../../models/Room');

const onSwipe  = (req, res) => {
  console.log("Swiping")

  //userID, roomID, movieID, {liked, disliked, seen}
  if(req.body.length !== 0){
    userID = req.user._id 
    roomID = req.body.roomID
    movieID = req.body.movieID
    swipeCategory = req.body.swipeCategory
  }

  if(swipeCategory === "liked"){
    likedMovie(userID, roomID, movieID);
  }else if(swipeCategory === "disliked"){
    dislikedMovie(userID, roomID, movieID);
  }else if(swipeCategory === "seen"){
    likesButHasSeen(userID, roomID, movieID);
  }
}

const likedMovie = (userID, roomID, movieID) => {
  //add to user document, swipeHistory
  User.findOne({_id: userID}, (error, user) => {
    if (error || user === null) {
      if(!error) return res.sendStatus(501);
      else return res.sendStatus(500);
    } else {
      //get swipe history (first array is liked, second array is disliked)
      //check if movie exists in liked movies list, if not push it in
      if (!user.swipeHistory[0].includes(movieID)) {
        user.swipeHistory[0].push({
          movieID
        });
        user.save();
      }
    }
  })
  //add to room document, likedMovies (if exists, add the userId, else create the array)
  Room.findOne({_id: roomID}, (error, room) => {
    if (error || user === null) {
      if(!error) return res.sendStatus(501);
      else return res.sendStatus(500);
    } else {
      if(!room.likedMovies.includes(movieID)){
        room.likedMovies.push({
          movieID: movieID,
          users: {userID}
        })
      }else{
        room.likedMovies.movieID.push(userID)
      }
      room.save();
    }
  })
  res.sendStatus(200);
}

const dislikedMovie = (userID, movieID) => {
  User.findOne({_id: userID}, (error, user) => {
    if (error || user === null) {
      if(!error) return res.sendStatus(501);
      else return res.sendStatus(500);
    } else {
      if (!user.swipeHistory[1].includes(movieID)) {
        user.swipeHistory[1].push({
          movieID
        });
        user.save();
      }
    }
  })
  res.sendStatus(200);
}

const likesButHasSeen = (userID, movieID) => {
  User.findOne({_id: userID}, (error, user) => {
    if (error || user === null) {
      if(!error) return res.sendStatus(501);
      else return res.sendStatus(500);
    } else {
      if (!user.seen.includes(movieID)) {
        user.seen.push({
          movieID
        });
        user.save();
      }
    }
  })
  res.sendStatus(200);
}

module.exports=onSwipe