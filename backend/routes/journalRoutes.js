const express = require("express");
const router = express.Router();

const {
  createJournal,
  getJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
} = require("../controllers/journalController");

const { protect } = require("../middleware/authMiddleware");

// All journal routes require authentication
router.use(protect);

router.post("/", createJournal);
router.get("/", getJournals);
router.get("/:id", getJournalById);
router.put("/:id", updateJournal);
router.delete("/:id", deleteJournal);

module.exports = router;