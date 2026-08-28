const express = require("express");

const {
  getOwners,
  getMyProfile,
  createOwner,
  updateOwner
} = require("../controllers/ownerController");

const {
  authenticate
} = require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const router = express.Router();

// ============================================================
// GET ALL OWNERS
// ADMIN ONLY
// ============================================================

router.get(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  getOwners
);

// ============================================================
// GET MY OWNER PROFILE
// OWNER ONLY
// ============================================================

router.get(
  "/profile",
  authenticate,
  authorizeRoles("OWNER"),
  getMyProfile
);

// ============================================================
// CREATE OWNER
// ADMIN / OWNER
// ============================================================

router.post(
  "/",
  authenticate,
  authorizeRoles(
    "ADMIN",
    "OWNER"
  ),
  createOwner
);

// ============================================================
// UPDATE OWNER
// ADMIN / OWNER
// ============================================================

router.put(
  "/:id",
  authenticate,
  authorizeRoles(
    "ADMIN",
    "OWNER"
  ),
  updateOwner
);

module.exports = router;