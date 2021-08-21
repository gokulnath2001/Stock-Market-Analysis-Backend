// Importing packages
const express = require("express");
require("./database/mongodb");
// Setting up object app as a router
const app = express();
const cron = require("node-cron");
// Importing local files
const userRouter = require("./routes/userRouter");
const stockRouter = require("./routes/stockRouter");
const api = require("./data/apidata");
const cors = require("cors");
// Run scripts
cron.schedule(
  "30 21 * * *",
  () => {
    console.log("Starting the data");
    api.getStockData();
    api.getIndices();
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);
app.use(cors());
app.use(express.json());
// Setting up routes (or) route end-points
app.get("/", (req, res) => {
  try {
    res.json({ message: "Welcome to home page" });
  } catch (e) {
    res.status(400).json({ message: "Error" });
  }
});

app.use(userRouter);
app.use(stockRouter);

app.get("*", (req, res) => {
  res.status(400).json({ message: "ERROR 404! Page not found" });
});

// Starting the server at the defined port = PORT
app.listen(process.env.PORT || 80);
