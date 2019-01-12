var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  room: String,
  type: String,
  status: String,
  extras: {},
  change: {},
  timestamp: Number,
  datestamp: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  }
});

module.exports = mongoose.model("Task", TaskSchema);
