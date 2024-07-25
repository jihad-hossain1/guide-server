const mongoose = require("mongoose");

const ContinentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name are required"],
    max: [30, "max character 30"],
  },
  code: { 
    type: String, 
    reqired: [true, "Code are required"] },
  img: {
    type: String
  },
});

module.exports = mongoose.model("Continent", ContinentSchema);
