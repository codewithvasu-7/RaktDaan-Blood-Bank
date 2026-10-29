const express = require("express");
const {
  getNationalSummaryController,
  getNationalEventsController,
} = require("../controllers/nationalStatsController");

const router = express.Router();

// GET: Summary of country daily & yearly blood donation stats
router.get("/summary", getNationalSummaryController);

// GET: Events & Camps happening across different states & cities
router.get("/events", getNationalEventsController);

module.exports = router;
