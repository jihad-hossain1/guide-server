const mongoose = require("mongoose");

const TourSpotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 100,
      min: 5,
    },
    slug: {
      type: String,
      required: true,
      max: 100,
      min: 5,
    },

    description: {
      type: String,
      required: true,
      max: 5000,
      min: 20
    },

    photo: {
      type: String,
    },

    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    divisionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Division",
    },

    cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
    
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TourSpot", TourSpotSchema);
