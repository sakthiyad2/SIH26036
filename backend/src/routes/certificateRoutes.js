const express = require("express");

const {
  getCertificates,
  getMyCertificates,
  getCertificate,
  download,
  create,
  verify,
  verifyBySerialNumber,
  updateStatus
} = require("../controllers/certificateController");

const {
  authenticate,
  authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

// ============================================================
// PUBLIC CERTIFICATE VERIFICATION
// GET /api/certificates/verify/:number
// ============================================================

router.get(
  "/verify/:number",
  verify
);

router.get(
  "/verify/serial/:serial",
  verifyBySerialNumber
);

router.get(
  "/my",
  authenticate,
  authorizeRoles("OWNER"),
  getMyCertificates
);

router.get(
  "/:id/download",
  authenticate,
  download
);

// ============================================================
// PUBLIC CERTIFICATE LIST
// GET /api/certificates
// ============================================================

router.get(
  "/",
  getCertificates
);

// ============================================================
// PUBLIC CERTIFICATE DETAILS
// GET /api/certificates/:id
// ============================================================

router.get(
  "/:id",
  getCertificate
);

// ============================================================
// CREATE CERTIFICATE
// ADMIN / INSPECTOR
// POST /api/certificates
// ============================================================

router.post(
  "/",
  authenticate,
  authorizeRoles(
    "ADMIN",
    "INSPECTOR",
    "OFFICIAL"
  ),
  create
);

// ============================================================
// UPDATE CERTIFICATE STATUS
// ADMIN ONLY
// PATCH /api/certificates/:id/status
// ============================================================

router.patch(
  "/:id/status",
  authenticate,
  authorizeRoles("ADMIN"),
  updateStatus
);

module.exports = router;