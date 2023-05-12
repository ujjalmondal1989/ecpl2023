var mongoose = require("mongoose");

var playerSchema = new mongoose.Schema({
  name: String,
  age: String,
  height: String,
  weight: String,
  position: String,
  achievements: String,
  address: String,
  photos: [String],
  soldTo: { type: String, default: null },
  soldAmount: { type: String, default: 0 },
  created: { type: Date, default: Date.now }
});

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model("Players", playerSchema);
