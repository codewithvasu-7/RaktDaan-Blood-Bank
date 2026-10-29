const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddelware = require("../middlewares/authMiddelware");
const { authLimiter } = require("../middlewares/rateLimiters");

const router = express.Router();

//routes
//REGISTER || POST (Protected with brute-force rate limiter)
router.post("/register", authLimiter, registerController);

//LOGIN || POST (Protected with brute-force rate limiter)
router.post("/login", authLimiter, loginController);

//GET CURRENT USER || GET
router.get("/current-user", authMiddelware, currentUserController);

module.exports = router;

