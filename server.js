
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const Dot = require("./models");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
mongoose.Promise=global.Promise;
 

//for cosmosdb
const mongoUri=`mongodb://${process.env.dbName}:${process.env.key}@${process.env.dbName}.documents.azure.com:10255/mean?ssl=true&sslverifycertificate=false`

 
 
const app = express();
  
var cors = require("cors");

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.PORT || 3001;
 
// db config -- set your URI from mLab in secrets.js
 //for mlab
//mongoose.connect(process.env.mLabURI,{ useNewUrlParser: true });
//for local db
//mongoose.connect('mongodb://127.0.0.1:27017/dots',{ useNewUrlParser: true });
//for cosmos.db
mongoose.connect(mongoUri,{ useNewUrlParser: true }).then(() => console.log('connection successful'))
.catch((err) => console.error("oh balls! "+ err));
 
 

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
// now we should configure the API to use bodyParser and look for JSON data in the request body

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
app.get("/message", (_req, res) => {
  Dot.find((err, comments) => {
    if (err) return res.json({ success: false, error: err });
    
    return res.json({ success: true, data: comments });
  });
});


app.post("/message", (req, res) => {
  const dots = new Dot();
  // body parser lets us use the req.body
  const  dot  = req.body;
  dots.dots=dot.dot;
 
  dots.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


app.delete("/reset", function(_req, res) {
   
  db.dropCollection("dots", function (err, delOK) {

    if (err) {

        console.log("error delete collection");
        res.end();
        return res;
    } if (delOK) {
      
        console.log("delete collection success");
        res.end();
        return res;
    }
    res.end();
});
return res
});
 
 
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));


 