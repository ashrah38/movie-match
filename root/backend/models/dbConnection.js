require("dotenv").config();
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const mongoose = require("mongoose");
const url = `mongodb+srv://${db_username}:${db_password}@moviefinder.r81cs.mongodb.net/?retryWrites=true&w=majority`;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

function getAllUsers(){
  // mongoose.connect(url, connectionParams);
  // const connection = mongoose.connection;
  // connection.once('open', () => {
  //   console.log("MongoDB database connection established successfully");
  // })

  const users = require('./User');

  users.find().then(users => {
    return users;
  });
}

exports.getAllUsers = getAllUsers;