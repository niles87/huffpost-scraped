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

NoteSchema.pre("remove", function (next) {
  console.log("below is this.id");
  console.log(this._id);
  console.log("above is this.id");
  Article.remove({ note: [ObjectId(`${this._id}`)] }).then(() => {
    next();
  });
});

// NoteSchema.post("remove", function(document, next) {
//   const noteId = document._id;
//   console.log("-------------------");
//   console.log(noteId);
//   console.log("-------------------");
//   Article.find({ note: { $in: [noteId] } }).then((articles) => {
//     Promise.all(
//       articles.map((article) => Article.findOneAndUpdate(article._id, { $pull: { note: noteId } }))
//     );
//     next();
//   });
// });

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;

/**
 * I spent a better part of four days trying to figure out the issue with
 * notes not being removed from the ref in the Articles Model I dont know
 * how to go about fixing the issue. If anyone reading this can figure it
 * out please notify me in the issues on my github repo:
 * https://github.com/niles87/huffpost-scraped
 */
