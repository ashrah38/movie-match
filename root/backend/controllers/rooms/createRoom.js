// Importing express module
const express=require("express")
const router=express.Router()
const DbConnection = require('../../models/DbConnection');

// Handling request using router
router.get("/",(req,res,next)=>{
  //first step, check if all parameters are there
  //userID of room creator (adminID), and genre
  let adminID = ""
  let genre = ""
  if(req.body.length !== 0){
    adminID = req.body.adminID
    genre = req.body.genre
  }
  console.log("Values are", adminID, genre)
  
  // let userList = DbConnection.getAllUsers();
  // DbConnection.getAllUsers().then(res => {
  //   console.log(res)
  // })


  const result = Promise.resolve(DbConnection.getAllUsers());
  result.then(value =>{
    console.log(value)
  })

  //get list of codes from db
  //provide list to codeGen()
  //generate random room code 4 character length
  let code = codeGen()

  //we need two tables at least
  //a room code table
  //related to that room code, another table that contains the users part of that room OR
  //for each user, we can have lists of rooms they are part of

  //generate room code, check if it exists already in table of room codes
  //send back this room code to user
  res.send(code)
})

function codeGen(){
  let code = "";
  let charSet = "abcdefghijklmnopqrstuvwxyz0123456789";

  for(let i = 0; i < 4; i++){
    code += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }

  // while(existingCodes.contains(code)){
  //   code = "";
  //   for(let i = 0; i < 4; i++){
  //     code += charSet.charAt(Math.floor(Math.random() * charSet.length));
  //   }
  // }

  return code;
}
  
// Importing the router
module.exports=router