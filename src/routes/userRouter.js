// Importing packages
const express = require("express");
// Importing local files
const User = require("../database/userSchema");
// Setting up an object router as router.
const router = express();
// Setting up routes (or) route end-points
// TODO: Get user details
router.get("/user", async (req, res) => {
  try {
    // const id = req.body.id;
    // const user = await User.findOne({ _id: id });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Creates a new user
router.post("/user", (req, res) => {
  try {
    const user = new User(req.body);
    user.save();
    res.status(201).json({ message: "Success", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// TODO: Changes user details
router.put("/user", (req, res) => {
  try {
    res.status(202).json({ message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// TODO: Removes user details
router.delete("/user", (req, res) => {
  try {
    res.status(202).json({ message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// TODO: Login authentication
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ mail: req.body.mail });
    if (user.password !== req.body.password) throw new Error("Unauthenticated");
    res.status(202).json({ message: "success", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// TODO: Logs out
router.get("/logout", (req, res) => {
  try {
    res.status(202).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Exporting the routes which is defined in the object router.
module.exports = router;
