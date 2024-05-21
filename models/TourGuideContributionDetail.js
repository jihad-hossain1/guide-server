const mongoose = require("mongoose");

const includeType = new mongoose.Schema({
  include: {
    type: String,
    required: true,
  },
});
const notIncludeType = new mongoose.Schema({
  notInclude: {
    type: String,
    required: true,
  },
});

const additionalInfoType = new mongoose.Schema({
  info: {
    type: String,
    required: true,
  },
});

const TourGuideContributionDetailSchema = new mongoose.Schema({
  clientProfileID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TourGuide",
  },
  includes: {
    type: [includeType],
    required: true,
  },
  notIncludes: {
    type: [notIncludeType],
    required: true,
  },
  notice: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: [additionalInfoType],
  },
});

const TourGuideContributionDetail = mongoose.model(
  "TourGuideContributionDetail",
  TourGuideContributionDetailSchema
);

module.exports = { TourGuideContributionDetail };
