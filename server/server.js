
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const Dot = require("./models");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
// and create our instances
const app = express();
const router = require("./routes");
 
var cors = require("cors");

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.PORT || 3001;
// db config -- set your URI from mLab in secrets.js

mongoose.connect('mongodb://Admin:0mniWall@ds125073.mlab.com:25073/dots');

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
// now we should configure the API to use bodyParser and look for JSON data in the request body

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
app.post("/message", (req, res) => {
  const dots = new Dot();
  // body parser lets us use the req.body
  const  dot  = req.body;
dots.dots=dot.dot;
console.log(dots.dots)
  dots.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
app.use("/", router);
 
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));