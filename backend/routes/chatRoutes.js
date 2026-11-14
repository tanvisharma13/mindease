
const express = require("express");
const router = express.Router();

const {
  createConversation,
  getConversations,
  getConversationById,
  deleteConversation,
  sendMessage,
} = require("../controllers/chatController");

const { protect } = require("../middleware/authMiddleware");

// All chat routes require authentication
router.use(protect);

// Conversation management
router.post("/conversations", createConversation);
router.get("/conversations", getConversations);
router.get("/conversations/:id", getConversationById);
router.delete("/conversations/:id", deleteConversation);

// Send message and receive streamed AI response
router.post(
  "/conversations/:id/messages",
  sendMessage
);

module.exports = router;
