// Importing packages
const express = require("express");
//Importing local files
const TopGainers = require("../database/topGainerSchema");
const TopLosers = require("../database/topLoserSchema");
const Potential = require("../database/potentialSchema");
const Active = require("../database/activeSchema");
const Market = require("../database/marketSchema");
const Indices = require("../database/indexSchema");
// Setting up an object router as router.
const router = express();
// Setting up routes (or) route end-points
// Number of data available for the day
router.get("/getCount", async (req, res) => {
  try {
    const indexCount = await Indices.countDocuments({});
    const stockCount = await Market.countDocuments({});
    res.status(200).json({ indexCount, stockCount });
  } catch (e) {
    res.status(400).json({ message: error.message });
  }
});
// Available data display
router.get("/getCodes", async (req, res) => {
  try {
    const indices = await Indices.find({}, "BSEcode name -_id");
    const stocks = await Market.find({}, "BOMcode name -_id");
    res.status(200).json({ indices, stocks });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Fetches all the indices in the market
router.get("/getIndices", async (req, res) => {
  try {
    let skip = req.query.skip ? Number(req.query.skip) : 0;
    const data = await Indices.find({}).sort("name").skip(skip).limit(10);
    res.json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Fetches top stock gainers in the market
router.get("/getStocks/topGainers", async (req, res) => {
  try {
    const data = await TopGainers.find({});
    res.json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Fetches top stock losers in the market
router.get("/getStocks/topLosers", async (req, res) => {
  try {
    const data = await TopLosers.find({});
    res.json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Fetches all the stocks in the market
router.get("/getStocks/marketAction", async (req, res) => {
  try {
    let skip = req.query.skip ? Number(req.query.skip) : 0;
    const data = await Market.find({}).sort("name").skip(skip).limit(10);
    res.json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Fetches the upward potential stocks in the market
router.get("/getStocks/upwardPotential", async (req, res) => {
  try {
    const data = await Potential.find({});
    res.json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Fetches most active stocks in the market
router.get("/getStocks/mostActive", async (req, res) => {
  try {
    const data = await Active.find({});
    res.json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Exporting the routes which is defined in the object router.
module.exports = router;
