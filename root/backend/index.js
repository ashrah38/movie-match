const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors());
require("./models/dbConnection.js");

// built-in middleware to support JSON-encoded bodies for POST requests.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// built-in middelware to access browser cookies
app.use(cookieParser());

// routes
app.use("/", require("./controllers/roomControllers/roomControllers.js"));

// initializing port
app.listen(port, () => console.log("Port initialized"));
