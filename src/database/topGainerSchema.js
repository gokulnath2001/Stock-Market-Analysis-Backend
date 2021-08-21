const mongoose = require("mongoose");

const topGainerSchema = new mongoose.Schema({
  name: String,
  end_date: String,
  high: Number,
  low: Number,
  wap: Number,
  BOMcode: String,
});

const TopGainer = mongoose.model("Top Gainers", topGainerSchema);

module.exports = TopGainer;
