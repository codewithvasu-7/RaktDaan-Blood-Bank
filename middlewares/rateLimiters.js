const rateLimit = require("express-rate-limit");

// General API Rate Limiter: 300 requests per 15 mins
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes.",
  },
});

// Strict Auth Limiter: 15 login/register attempts per 15 mins (Prevents Brute-Force & Credential Stuffing)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login/registration attempts. For your security, this IP has been temporarily rate-limited for 15 minutes.",
  },
});

module.exports = { apiLimiter, authLimiter };
