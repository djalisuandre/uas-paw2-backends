const mongoose = require("mongoose");

const coffeesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  flavor_profile: {
    type: String,
    required: true,
  },
  roast_level: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Coffee = mongoose.model("Coffee", coffeesSchema);

module.exports = Coffee;
