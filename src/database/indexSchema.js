const mongoose = require("mongoose");

const indexSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  high: Number,
  low: Number,
  open: Number,
  close: Number,
  BSEcode: String,
  end_date: String,
});

const Indices = mongoose.model("Indices", indexSchema);

module.exports = Indices;
