const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AddressType = new mongoose.Schema({
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },
  division: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Division",
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },
});

const ClientSchema = new mongoose.Schema({
  address: AddressType,
  name: {
    type: String,
    required: true,
    unique: true,
    max: 100,
  },
  slug: {
    type: String,
    max: 100,
    min: 2,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  role: {
    type: String,
    enum: ["client", "admin"],
    default: "client",
  },
  clientType: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
});

ClientSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

module.exports = mongoose.model("Client", ClientSchema);
