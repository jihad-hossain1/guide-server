const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  name: String,
  photo: String,
  continentId: { type: mongoose.Schema.Types.ObjectId, ref: "Continent" },
  description: String,

});

module.exports = mongoose.model("Country", CountrySchema);
