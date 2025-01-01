const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
// import middleware auth and role
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Register route
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);

// Update user route
router.put(
  "/user/:id",
  authMiddleware,
  roleMiddleware("admin"),
  authController.updateUser
);

// Delete user route
router.delete(
  "/user/:id",
  authMiddleware,
  roleMiddleware("admin"),
  authController.deleteUser
);

module.exports = router;
