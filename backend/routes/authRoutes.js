
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  updateMe,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// Register new user
router.post("/register", registerUser);

// Login existing user
router.post("/login", loginUser);

// Get logged-in user
router.get("/me", authMiddleware, getMe);

// Update logged-in user's profile
router.put("/me", authMiddleware, updateMe);

module.exports = router;
