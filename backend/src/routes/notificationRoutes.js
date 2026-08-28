const express = require("express");

const {
  getNotifications,
  markRead
} = require("../controllers/notificationController");

const {
  authenticate
} = require("../middleware/authMiddleware");

const router = express.Router();

// ============================================================
// GET NOTIFICATIONS
// ============================================================

router.get(
  "/",
  authenticate,
  getNotifications
);

// ============================================================
// MARK NOTIFICATION AS READ
// ============================================================

router.patch(
  "/:id/read",
  authenticate,
  markRead
);

module.exports = router;