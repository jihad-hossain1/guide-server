const mongoose = require("mongoose");

const DivisionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 100,
    min: 2,
  },
  slug: {
    type: String,
    max: 100,
    min: 2,
  },
    countryId:{
        type: mongoose.Schema.Types.ObjectId, ref: "Country"
    },
    description: {
        type: String
    },
    photo: {
        type: String
    }
});

module.exports = mongoose.model("Division", DivisionSchema);