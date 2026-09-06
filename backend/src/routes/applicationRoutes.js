const express = require("express");

const {
  createApplication,
  getApplications,
  getApplication,
  getMyApplications,
  updateApplicationStatus,
  assignInspector
} = require("../controllers/applicationController");

const {
  authenticate,
  authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

// ============================================================
// CREATE APPLICATION
// OWNER ONLY
// POST /api/applications
// ============================================================

router.post(
  "/",
  authenticate,
  authorizeRoles("OWNER"),
  createApplication
);

// ============================================================
// GET APPLICATIONS
// ADMIN / INSPECTOR
// GET /api/applications
// ============================================================

router.get(
  "/",
  authenticate,
  authorizeRoles(
    "ADMIN",
    "INSPECTOR",
    "OFFICIAL"
  ),
  getApplications
);

// ============================================================
// GET MY APPLICATIONS
// OWNER ONLY
// GET /api/applications/my
// ============================================================

router.get(
  "/my",
  authenticate,
  authorizeRoles("OWNER"),
  getMyApplications
);

// ============================================================
// GET APPLICATION BY ID
// AUTHENTICATED
// GET /api/applications/:id
// ============================================================

router.get(
  "/:id",
  authenticate,
  getApplication
);

// ============================================================
// UPDATE APPLICATION STATUS
// ADMIN / INSPECTOR
// PATCH /api/applications/:id/status
// ============================================================

router.patch(
  "/:id/assign",
  authenticate,
  authorizeRoles("OFFICIAL"),
  assignInspector
);

router.patch(
  "/:id/status",
  authenticate,
  authorizeRoles(
    "ADMIN",
    "INSPECTOR",
    "OFFICIAL"
  ),
  updateApplicationStatus
);

module.exports = router;