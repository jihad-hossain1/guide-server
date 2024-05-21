const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema({
  name: String,
  country: String,
  location: String,
  description: String,
  photo: String,
});

module.exports = mongoose.model("Destination", DestinationSchema);
