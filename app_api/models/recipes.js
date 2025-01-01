const mongoose = require("mongoose");

const recipesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  coffees_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coffees",
    required: true,
  },
  image: {
    type: String,
  },
});

const Recipe = mongoose.model("Recipe", recipesSchema);

module.exports = Recipe;
