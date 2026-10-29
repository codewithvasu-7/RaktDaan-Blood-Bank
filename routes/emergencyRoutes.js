const express = require("express");
const authMiddleware = require("../middlewares/authMiddelware");
const {
  getNearbyDonorsController,
  sendEmergencyAlertController,
  getDonorDonationHistoryController,
  updateDonorAvailabilityController,
  createEmergencyRequestController,
  getOpenEmergencyRequestsController,
  fulfillEmergencyRequestController,
} = require("../controllers/emergencyController");

const router = express.Router();

// GET /api/v1/emergency/donors - Get nearby emergency donors with filters (Hospital/Org/Admin only)
router.get("/donors", authMiddleware, getNearbyDonorsController);

// POST /api/v1/emergency/send-alert - Send emergency email, whatsapp & call alert (Hospital/Org/Admin only)
router.post("/send-alert", authMiddleware, sendEmergencyAlertController);

// GET /api/v1/emergency/history/:donorId - Get donation history of donor
router.get("/history/:donorId", authMiddleware, getDonorDonationHistoryController);

// PUT /api/v1/emergency/toggle-availability - Update availability status
router.put("/toggle-availability", authMiddleware, updateDonorAvailabilityController);

// POST /api/v1/emergency/create-request - Post emergency blood requirement (Hospital/Admin only)
router.post("/create-request", authMiddleware, createEmergencyRequestController);

// GET /api/v1/emergency/open-requests - Public feed of urgent blood requirements (RaktDaan Live Board)
router.get("/open-requests", getOpenEmergencyRequestsController);

// PUT /api/v1/emergency/fulfill-request/:requestId - Fulfill emergency requirement
router.put("/fulfill-request/:requestId", authMiddleware, fulfillEmergencyRequestController);

module.exports = router;
