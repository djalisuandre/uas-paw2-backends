const mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  featured_image: {
    type: String,
  },
  coffees_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coffees",
    required: true,
  },
});

const Article = mongoose.model("Article", articlesSchema);

module.exports = Article;
