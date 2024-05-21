const mongoose = require("mongoose");

const personPicType = new mongoose.Schema({
  adult: {
    type: Number,
    required: true,
  },
  children: {
    type: Number,
    default: 0,
  },
  infant: {
    type: Number,
    default: 0,
  },
  totalPerson: {
    type: Number,
  },
});

const startTimeType = new mongoose.Schema({
  timePic: {
    type: String,
    required: true,
  },
});

const TourGuideReverveSchema = new mongoose.Schema(
  {
    clientProfileID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourGuide",
    },
    guideContribution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourGuideContribution",
    },
    personPic: {
      type: personPicType,
    },
    startTime: {
      type: [startTimeType],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TourGuideReverve", TourGuideReverveSchema);
