const mongoose = require("mongoose");

const potentialSchema = new mongoose.Schema({
  name: String,
  shares: Number,
  turnover: Number,
  end_date: String,
  BOMcode: String,
});

const UpwardPotential = mongoose.model("Upward Potential", potentialSchema);

module.exports = UpwardPotential;
