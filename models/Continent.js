const mongoose = require("mongoose");

const ContinentSchema = new mongoose.Schema({
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
  code: { 
    type: String, 
    reqired: [true, "Code are required"] },
  img: {
    type: String
  },
});

module.exports = mongoose.model("Continent", ContinentSchema);
