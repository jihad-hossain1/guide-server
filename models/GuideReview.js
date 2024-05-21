const mongoose = require("mongoose");

const TourGuideReviewSchema = new mongoose.Schema({
  name: String,
  img: String,
  title: String,
  tourSpotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TourSpot",
  },
  email: String,
  content: String,
  rating: Number,
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  
},{ timestamps: true });

module.exports = mongoose.model("GuideReview", TourGuideReviewSchema);