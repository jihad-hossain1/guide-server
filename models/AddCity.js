const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
  },
    description: {
        type: String
    },
    photo: { type: String },
    divisionId: {type: mongoose.Schema.Types.ObjectId, ref: "Division"}
});

module.exports = mongoose.model("City", CitySchema);