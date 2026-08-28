const express = require("express");

const {
  getCertificates,
  getCertificate,
  create,
  verify,
  updateStatus
} = require("../controllers/certificateController");

const {
  authenticate
} = require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const router = express.Router();

// ============================================================
// PUBLIC CERTIFICATE VERIFICATION
// GET /api/certificates/verify/:number
// ============================================================

router.get(
  "/verify/:number",
  verify
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
    "INSPECTOR"
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