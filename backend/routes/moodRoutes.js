const express = require("express");
const router = express.Router();

const {
  createMood,
  getMoods,
  getMoodSummary,
  updateMood,
  deleteMood,
} = require("../controllers/moodController");

const { protect } = require("../middleware/authMiddleware");

// All mood routes require authentication
router.use(protect);

router.post("/", createMood);
router.get("/", getMoods);
router.get("/summary", getMoodSummary);
router.put("/:id", updateMood);
router.delete("/:id", deleteMood);

module.exports = router;