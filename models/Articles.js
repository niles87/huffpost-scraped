const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: "needs something here",
  },
  link: {
    type: String,
    required: "needs something here",
  },
  description: {
    type: String,
    default: "No Description",
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note",
  },
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
