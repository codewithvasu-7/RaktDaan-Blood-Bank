const express = require("express");
const authMiddleware = require("../middlewares/authMiddelware");
const {
  getAllCampsController,
  createCampController,
  registerForCampController,
  deleteCampController,
} = require("../controllers/campController");

const router = express.Router();

// GET /api/v1/camps/all - Publicly list all upcoming blood donation camps
router.get("/all", getAllCampsController);

// POST /api/v1/camps/create - Create camp (Organisation and Admin)
router.post("/create", authMiddleware, createCampController);

// POST /api/v1/camps/register - Register as donor for a camp
router.post("/register", authMiddleware, registerForCampController);

// DELETE /api/v1/camps/:campId - Delete camp
router.delete("/:campId", authMiddleware, deleteCampController);

module.exports = router;
