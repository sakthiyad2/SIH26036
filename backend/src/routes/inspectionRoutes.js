const express = require("express");

const {
  createInspection,
  getInspections,
  getPendingInspections,
  getInspection,
  getMyInspections,
  addResult,
  updateInspectionStatus
} = require("../controllers/inspectionController");

const {
  authenticate,
  authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

// ============================================================
// GET ALL INSPECTIONS
// ADMIN ONLY
// ============================================================

router.get(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  getInspections
);

// ============================================================
// GET PENDING INSPECTIONS
// ADMIN / INSPECTOR
// ============================================================

router.get(
  "/pending",
  authenticate,
  authorizeRoles(
    "ADMIN",
    "INSPECTOR"
  ),
  getPendingInspections
);

// ============================================================
// GET MY INSPECTIONS
// INSPECTOR ONLY
// ============================================================

router.get(
  "/my",
  authenticate,
  authorizeRoles("INSPECTOR"),
  getMyInspections
);

// ============================================================
// GET INSPECTION
// AUTHENTICATED
// ============================================================

router.get(
  "/:id",
  authenticate,
  getInspection
);

// ============================================================
// CREATE INSPECTION
// ADMIN ONLY
// ============================================================

router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  createInspection
);

// ============================================================
// ADD INSPECTION RESULT
// INSPECTOR ONLY
// ============================================================

router.post(
  "/results",
  authenticate,
  authorizeRoles("INSPECTOR"),
  addResult
);

// ============================================================
// UPDATE INSPECTION STATUS
// INSPECTOR / ADMIN
// ============================================================

router.patch(
  "/:id/status",
  authenticate,
  authorizeRoles(
    "INSPECTOR",
    "ADMIN"
  ),
  updateInspectionStatus
);

module.exports = router;