const express = require("express");

const {
  register,
  login,
  getMe
} = require("../controllers/authController");

const {
  authenticate
} = require("../middleware/authMiddleware");

const router = express.Router();

// ============================================================
// REGISTER
// POST /api/auth/register
// ============================================================

router.post(
  "/register",
  register
);

// ============================================================
// LOGIN
// POST /api/auth/login
// ============================================================

router.post(
  "/login",
  login
);

// ============================================================
// CURRENT USER
// GET /api/auth/me
// ============================================================

router.get(
  "/me",
  authenticate,
  getMe
);

module.exports = router;