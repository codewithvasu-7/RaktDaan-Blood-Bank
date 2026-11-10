const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");
const { apiLimiter } = require("./middlewares/rateLimiters");

// dot config
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();

// Security Middleware 1: Helmet for secure HTTP headers (OWASP A05)
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows flexible integration with client-side react dev server
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    noSniff: true,
    xssFilter: true,
    hidePoweredBy: true,
  })
);

// Security Middleware 2: Data sanitization against NoSQL query injection (OWASP A03)
app.use(mongoSanitize());

// Security Middleware 3: Global API Rate limiting against DoS attacks (OWASP A04)
app.use("/api/", apiLimiter);

// Security Middleware 4: Strict CORS policy
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:8080",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow non-browser requests or localhost or configured CLIENT_URL or Vercel preview/production domains
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.endsWith(".onrender.com") ||
        process.env.CLIENT_URL === "*"
      ) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation: Access from this origin is not allowed."), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Standard Middlewares with Payload Size Limit (OWASP A08)
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RaktDaan Blood Bank API is Live & Running 🚀",
    database: require("mongoose").connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/emergency", require("./routes/emergencyRoutes"));
app.use("/api/v1/camps", require("./routes/campRoutes"));
app.use("/api/v1/national-stats", require("./routes/nationalStatsRoutes"));

// Static Assets Serving for Production (Unified Railway / Monorepo Support)
const clientBuildPath = path.join(__dirname, "client", "build");
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) {
      return next();
    }
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

// Centralized Security Error Handler (OWASP A05 - Prevent Stack Trace Leaks)
app.use((err, req, res, next) => {
  console.error("Unhandled Security/Server Error:", err.message);
  if (err.message && err.message.includes("CORS")) {
    return res.status(403).json({ success: false, message: err.message });
  }
  return res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === "development" ? err.message : "Internal secure server error",
  });
});

// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE || "development"} Mode On Port ${PORT}`
      .bgBlue.white
  );
});
