const mongoose = require("mongoose");

const UrlsSchemaType = new mongoose.Schema({
  image: {
    type: String,
  },
});

const Images = new mongoose.Schema({
  urls: {
    type: [UrlsSchemaType],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  clientProfileID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TourGuide",
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  contributionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TourGuideContribution",
  },
});

module.exports = mongoose.model("Image", Images);
