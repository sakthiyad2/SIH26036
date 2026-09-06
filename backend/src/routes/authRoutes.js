const express = require("express");

const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword
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

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password",
  resetPassword
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