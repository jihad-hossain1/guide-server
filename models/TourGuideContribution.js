const mongoose = require("mongoose");

const ContributeType = new mongoose.Schema({
  picTime: {
    type: String,
    required: true,
  },
  contributeTitle: {
    type: String,
    max: 100,
    min: 5,
    trim: true,
    required: true,
  },
  content: {
    type: String,
    required: true,
    max: 150,
    min: 5,
    trim: true,
  },
});

const TourGuideContributionSchema = new mongoose.Schema(
  {
    contribute: {
      type: [ContributeType],
      required: true,
    },
    title: {
      type: String,
      required: true,
      max: 100,
      min: 10,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    about: {
      type: String,
      max: 300,
      min: 20,
      trim: true,
      required: true,
    },
    tourPlaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourSpot",
    },
    clientProfileID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourGuide",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "TourGuideContribution",
  TourGuideContributionSchema
);
