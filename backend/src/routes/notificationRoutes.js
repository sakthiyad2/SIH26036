const express = require("express");

const {
  getNotifications,
  markRead,
  markAllRead,
  removeNotification
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

router.patch(
  "/read-all",
  authenticate,
  markAllRead
);

// ============================================================
// MARK NOTIFICATION AS READ
// ============================================================

router.patch(
  "/:id/read",
  authenticate,
  markRead
);

router.delete(
  "/:id",
  authenticate,
  removeNotification
);

module.exports = router;