const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const userId = req.body.userId || req.userId;
    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: Missing user credentials",
      });
    }

    const user = await userModel.findById(userId);
    if (!user || user.role !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Forbidden: Admin privileges required",
      });
    }

    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(401).send({
      success: false,
      message: "Authentication Failed: Admin verification error",
      error: error.message,
    });
  }
};

