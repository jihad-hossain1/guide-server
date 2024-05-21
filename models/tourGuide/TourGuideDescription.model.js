const mongoose = require("mongoose");

const TourGuideDescriptionSchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

const TourGuideDescription = mongoose.model(
  "TourGuideDescription",
  TourGuideDescriptionSchema
);

module.exports = { TourGuideDescription };
