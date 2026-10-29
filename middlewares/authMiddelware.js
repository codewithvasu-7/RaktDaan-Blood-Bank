const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Authorization token missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token || token === "null" || token === "undefined") {
      return res.status(401).send({
        success: false,
        message: "Authentication token is missing",
      });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed: Token is expired or invalid",
        });
      } else {
        req.body = req.body || {};
        req.body.userId = decode.userId;
        req.userId = decode.userId;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error: error.message || error,
      message: "Authentication Failed",
    });
  }
};

