
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// Register new user
router.post("/register", registerUser);

// Login existing user
router.post("/login", loginUser);

// Get logged-in user (Protected Route)
router.get("/me", authMiddleware, getMe);

module.exports = router;
