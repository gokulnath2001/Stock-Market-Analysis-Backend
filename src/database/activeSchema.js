const mongoose = require("mongoose");

const activeSchema = new mongoose.Schema({
  name: String,
  end_date: String,
  shares: Number,
  BOMcode: String,
});

const ActiveStocks = mongoose.model("Most Active", activeSchema);

module.exports = ActiveStocks;
