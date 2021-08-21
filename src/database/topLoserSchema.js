const mongoose = require("mongoose");

const topLoserSchema = new mongoose.Schema({
  name: String,
  end_date: String,
  high: Number,
  low: Number,
  wap: Number,
  BOMcode: String,
});

const TopLosers = mongoose.model("Top Losers", topLoserSchema);

module.exports = TopLosers;
