const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const optionalAuthMiddleware = require("../middlewares/optionalAuthMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
  getPublicStockAvailabilityController,
  getExpiryAlertsController,
} = require("../controllers/inventoryController");

const router = express.Router();

//routes
// ADD INVENTORY || POST
router.post("/create-inventory", authMiddelware, createInventoryController);

//GET ALL BLOOD RECORDS
router.get("/get-inventory", authMiddelware, getInventoryController);
//GET RECENT BLOOD RECORDS
router.get(
  "/get-recent-inventory",
  authMiddelware,
  getRecentInventoryController
);

//GET HOSPITAL BLOOD RECORDS
router.post(
  "/get-inventory-hospital",
  authMiddelware,
  getInventoryHospitalController
);

//GET DONAR RECORDS
router.get("/get-donars", authMiddelware, getDonarsController);

//GET HOSPITAL RECORDS
router.get("/get-hospitals", authMiddelware, getHospitalController);

//GET orgnaisation RECORDS (Public & Authenticated)
router.get("/get-orgnaisation", optionalAuthMiddleware, getOrgnaisationController);

//GET orgnaisation RECORDS
router.get(
  "/get-orgnaisation-for-hospital",
  authMiddelware,
  getOrgnaisationForHospitalController
);

// GET PUBLIC BLOOD STOCK (Unauthenticated citizen portal)
router.get("/public-stock", getPublicStockAvailabilityController);

// GET ZERO-WASTAGE EXPIRY ALERTS
router.get("/expiry-alerts", authMiddelware, getExpiryAlertsController);

module.exports = router;
