const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
app.use(cors());
require("./models/dbConnection.js");

// built-in middleware to support JSON-encoded bodies for POST requests.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initializing port
app.listen(port, () => console.log("Port initialized"));
