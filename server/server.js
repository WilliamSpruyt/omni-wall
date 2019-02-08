const env = require('./env/environment');
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const Dot = require("./models");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
//const mongoUri = `mongodb://${env.dbName}.documents.azure.com:${env.cosmosPort}/?ssl/=true&sslverifycertificate=false`;
const mongoUri='mongodb://dottybase:iP94TfwK90MUV7eMt3aAHo7QxmOL8Odf6u5X8dJd1T4JCiX41zE7yS0N1vRHyWWWUzfD3UlwSGaPN9ZFWaR2Aw==@dottybase.documents.azure.com:10255/?ssl=true&replicaSet=globaldb'
console.log(mongoUri)
// and create our instances
const app = express();
 
var cors = require("cors");

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.PORT || 3001;
// db config -- set your URI from mLab in secrets.js
 //for mlab
//mongoose.connect   ('mongodb://Admin:0mniWall@ds125073.mlab.com:25073/dots');
//for local db
//mongoose.connect('mongodb://127.0.0.1:27017/dots',{ useNewUrlParser: true });
//for cosmos.db
mongoose.connect(mongoUri,{ auth: { user: env.dbName, password: env.key }, useNewUrlParser: true });
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


 