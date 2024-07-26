const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 100,
    min: 2,
  },
  slug: {
    type: String,
    max: 100,
    min: 2,
  },
  photo: String,
  continentId: { type: mongoose.Schema.Types.ObjectId, ref: "Continent" },
  description: String,

});

module.exports = mongoose.model("Country", CountrySchema);
