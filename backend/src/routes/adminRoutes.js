const express = require("express");

const {
  getDashboard,
  getReports,
  getUsers,
  getInstruments,
  getCertificates,
  getAuditLogs
} = require("../controllers/adminController");

const {
  authenticate,
  authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

// ============================================================
// ALL ADMIN ROUTES
// ============================================================

router.use(
  authenticate,
  authorizeRoles("ADMIN")
);

// ============================================================
// DASHBOARD
// GET /api/admin/dashboard
// ============================================================

router.get(
  "/dashboard",
  getDashboard
);

// ============================================================
// REPORTS
// ============================================================

router.get(
  "/reports",
  getReports
);

// ============================================================
// USERS
// ============================================================

router.get(
  "/users",
  getUsers
);

// ============================================================
// INSTRUMENTS
// ============================================================

router.get(
  "/instruments",
  getInstruments
);

// ============================================================
// CERTIFICATES
// ============================================================

router.get(
  "/certificates",
  getCertificates
);

// ============================================================
// AUDIT LOGS
// ============================================================

router.get(
  "/audit-logs",
  getAuditLogs
);

module.exports = router;