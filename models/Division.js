const mongoose = require("mongoose");

const DivisionSchema = new mongoose.Schema({
  name: {
    type: String,
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