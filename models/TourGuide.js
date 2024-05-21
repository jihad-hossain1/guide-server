const mongoose = require("mongoose");

const TourGuideSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      max: 1500,
      min: 20,
    },
    about: {
      type: String,
      max: 300,
      min: 20,
    },
    importenNotice: {
      type: String,
    },
    uptoPeople: {
      type: Number,
    },
    responseTime: {
      type: String,
    },
    languages: {
      type: Array,
    },
    profileImage: {
      type: String,
    },
    type: {
      type: String,
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    guidePlaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TourGuideContribution",
      },
    ],
    // tours: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "TourSpot",
    //   },
    // ],

    // replies: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Review",
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("TourGuide", TourGuideSchema);
