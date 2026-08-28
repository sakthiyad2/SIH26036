const express = require("express");

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const {
  authenticate
} = require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  getUsers
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