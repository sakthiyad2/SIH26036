const express = require("express");

const {
  getUsers,
  getInspectors,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const {
  authenticate,
  authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  getUsers
);

router.get(
  "/inspectors",
  authenticate,
  authorizeRoles("ADMIN", "OFFICIAL"),
  getInspectors
);

router.get(
  "/:id",
  authenticate,
  getUser
);

router.put(
  "/:id",
  authenticate,
  updateUser
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  deleteUser
);

module.exports = router;