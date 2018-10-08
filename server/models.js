var mongoose = require("mongoose");

var StatSchema = new mongoose.Schema({
  
  dots: Array,
  
});

module.exports = mongoose.model("Dot", StatSchema);