const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userBookSchema = new Schema({
  userId: String,
  isbn: Number,
  state: String,
});

module.exports = mongoose.model("userBook", userBookSchema);
