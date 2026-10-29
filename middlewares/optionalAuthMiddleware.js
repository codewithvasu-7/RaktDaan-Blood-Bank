const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      if (token && token !== "null" && token !== "undefined") {
        try {
          const decode = JWT.verify(token, process.env.JWT_SECRET);
          req.body = req.body || {};
          req.body.userId = decode.userId;
          req.userId = decode.userId;
        } catch (jwtErr) {
          // Token expired or invalid - ignore for optional routes
        }
      }
    }
    next();
  } catch (error) {
    next();
  }
};
