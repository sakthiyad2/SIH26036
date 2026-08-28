const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("./config/config");

// ============================================================
// CREATE EXPRESS APP
// ============================================================

const app = express();

// ============================================================
// CORS
// ============================================================

app.use(
  cors(config.cors)
);

// ============================================================
// BODY PARSER
// ============================================================

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true
  })
);

// ============================================================
// STATIC FILES
// ============================================================

app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "../uploads"
    )
  )
);

// ============================================================
// ROUTES
// ============================================================

// AUTH
const authRoutes =
  require("./routes/authRoutes");

app.use(
  "/api/auth",
  authRoutes
);

// USERS
const userRoutes =
  require("./routes/userRoutes");

app.use(
  "/api/users",
  userRoutes
);

// OWNERS
const ownerRoutes =
  require("./routes/ownerRoutes");

app.use(
  "/api/owners",
  ownerRoutes
);

// INSTRUMENTS
const instrumentRoutes =
  require("./routes/instrumentRoutes");

app.use(
  "/api/instruments",
  instrumentRoutes
);

// APPLICATIONS
const applicationRoutes =
  require("./routes/applicationRoutes");

app.use(
  "/api/applications",
  applicationRoutes
);

// INSPECTIONS
const inspectionRoutes =
  require("./routes/inspectionRoutes");

app.use(
  "/api/inspections",
  inspectionRoutes
);

// CERTIFICATES
const certificateRoutes =
  require("./routes/certificateRoutes");

app.use(
  "/api/certificates",
  certificateRoutes
);

// NOTIFICATIONS
const notificationRoutes =
  require("./routes/notificationRoutes");

app.use(
  "/api/notifications",
  notificationRoutes
);

// ADMIN
const adminRoutes =
  require("./routes/adminRoutes");

app.use(
  "/api/admin",
  adminRoutes
);

// INSPECTOR
const inspectorRoutes =
  require("./routes/inspectorRoutes");

app.use(
  "/api/inspector",
  inspectorRoutes
);

// ============================================================
// HEALTH CHECK
// ============================================================

app.get(
  "/",
  (req, res) => {
    res.json({
      success: true,
      message:
        "SIH26036 Backend API is running"
    });
  }
);

// ============================================================
// API HEALTH CHECK
// ============================================================

app.get(
  "/api",
  (req, res) => {
    res.json({
      success: true,
      message:
        "SIH26036 API is working"
    });
  }
);

// ============================================================
// 404 HANDLER
// ============================================================

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message:
        `Route not found: ${req.method} ${req.originalUrl}`
    });
  }
);

// ============================================================
// ERROR HANDLER
// ============================================================

app.use(
  (err, req, res, next) => {

    console.error(
      "Express error:",
      err
    );

    res.status(
      err.status || 500
    ).json({
      success: false,
      message:
        err.message ||
        "Internal server error"
    });
  }
);

module.exports = app;