const mongoose = require("mongoose");
const Article = require("./Articles");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: String,
  body: String,
});

NoteSchema.post("remove", (document) => {
  const noteId = document._id;
  Article.find({ notes: { $in: [noteId] } }).then((articles) => {
    Promise.all(
      articles.map((article) =>
        Article.findOneAndUpdate(article._id, { $pull: { note: noteId } }, { new: true })
      )
    );
  });
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
