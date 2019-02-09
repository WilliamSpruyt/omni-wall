var mongoose = require("mongoose");

var DotSchema = new mongoose.Schema({
  
  dots: Array,
  
});

module.exports = mongoose.model("Dot", DotSchema);