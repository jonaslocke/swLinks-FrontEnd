const mongoose = require("mongoose");

const LinkSchema = mongoose.Schema({
  url: { type: String, require: true },
  label: { type: String, require: true },
  category: { type: String, require: true },
});

module.exports = mongoose.model("Links", LinkSchema);
