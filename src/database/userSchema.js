const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  mail: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
