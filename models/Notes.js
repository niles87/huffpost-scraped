const mongoose = require("mongoose");
const Article = require("./Articles");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

NoteSchema.pre("findOneAndDelete", function (next) {
  Article.remove({ note: [ObjectId(`${this._id}`)] }).then(() => {
    next();
  });
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
