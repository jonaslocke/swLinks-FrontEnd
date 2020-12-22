const mongoose = require("mongoose");

const PlayerSchema = mongoose.Schema({
  name: { type: String, require: true },
  natFiveOwned: { type: Number, require: true },
  creationDate: { type: Date, require: true },
});

module.exports = mongoose.model("Players", PlayerSchema);
