const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
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
  tourSpotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TourSpot",
  },
  divisionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Division",
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },
  description: {
    type: String,
  },
  photo: { type: String },
});

module.exports = mongoose.model("City", CitySchema);