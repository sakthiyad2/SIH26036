const express = require("express");

const {
  getInstruments,
  getInstrument,
  searchInstrument,
  getMyInstruments,
  createInstrument,
  updateInstrument
} = require("../controllers/instrumentController");

const {
  authenticate,
  authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

// ============================================================
// PUBLIC SEARCH
// ============================================================

router.get(
  "/search/:serial",
  searchInstrument
);

// ============================================================
// OWNER INSTRUMENTS
// ============================================================

router.get(
  "/my",
  authenticate,
  authorizeRoles("OWNER"),
  getMyInstruments
);

// ============================================================
// OWNER INSTRUMENTS - ALTERNATE
// ============================================================

router.get(
  "/owner/my-instruments",
  authenticate,
  authorizeRoles("OWNER"),
  getMyInstruments
);

// ============================================================
// GET ALL INSTRUMENTS
// PUBLIC
// ============================================================

router.get(
  "/",
  getInstruments
);

// ============================================================
// GET INSTRUMENT
// PUBLIC
// ============================================================

router.get(
  "/:id",
  getInstrument
);

// ============================================================
// CREATE INSTRUMENT
// OWNER / OFFICIAL / ADMIN
// ============================================================

router.post(
  "/",
  authenticate,
  authorizeRoles(
    "OWNER",
    "OFFICIAL",
    "ADMIN"
  ),
  createInstrument
);

// ============================================================
// UPDATE INSTRUMENT
// OWNER / OFFICIAL / ADMIN
// ============================================================

router.put(
  "/:id",
  authenticate,
  authorizeRoles(
    "OWNER",
    "OFFICIAL",
    "ADMIN"
  ),
  updateInstrument
);

module.exports = router;