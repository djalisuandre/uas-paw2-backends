const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coffees_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coffees",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;
