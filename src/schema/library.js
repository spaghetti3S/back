const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const librarySchema = new Schema({
  libCode: Number,
  libName: String,
  address: String,
  region: Number,
  dtl_region: Number,
  latitude: Number,
  longitude: Number,
  homepage: String,
  closed: String,
  operationTime: String,
});

module.exports = mongoose.model("library", librarySchema);
