const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: Number,
  userId: String,
  password: String,
  sex: String,
  age: Number,
});

module.exports = mongoose.model("user", userSchema);
