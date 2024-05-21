const mongoose = require("mongoose");

const ContinentSchema = new mongoose.Schema({
  name: String,
  code: String,
  countryId: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
  img: String,
});

module.exports = mongoose.model("Continent", ContinentSchema);
