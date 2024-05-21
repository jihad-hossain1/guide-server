const mongoose = require("mongoose");

const ContributeType = new mongoose.Schema({
  picTime: {
    type: String,
    required: true,
  },
  contributeTitle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
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
    },
    price: {
      type: Number,
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
