const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shares: Number,
  trades: Number,
  open: Number,
  close: Number,
  BOMcode: String,
  end_date: String,
});

const Market = mongoose.model("Market Action", marketSchema);

module.exports = Market;
