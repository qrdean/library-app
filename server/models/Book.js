const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  lccn: String,
  isbn: String,
  title: String,
  authors: [String],
  publishDate: String,
  available: Boolean
});
module.exports = mongoose.model("Book", BookSchema);
