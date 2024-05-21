const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
  photo: String,
});

module.exports = mongoose.model("User", UserSchema);
