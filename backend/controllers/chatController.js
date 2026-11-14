
const mongoose = require("mongoose");
const Conversation = require("../models/Conversation");

const {
  generateChatResponse,
} = require("../services/chatbotService");

// Create a new conversation
const createConversation = async (req, res) => {
  try {
    const conversation = await Conversation.create({
      user: req.user.id,
      title: "New conversation",
      messages: [],
    });

    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error("Create conversation error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to create conversation",
    });
  }
};

// Get all conversations belonging to the logged-in user
const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      user: req.user.id,
    })
      .select("title createdAt updatedAt")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: conversations.length,
      conversations,
    });
  } catch (error) {
    console.error("Get conversations error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve conversations",
    });
  }
};

// Get one conversation with its messages
const getConversationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation ID",
      });
    }

    const conversation = await Conversation.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error("Get conversation error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve conversation",
    });
  }
};

// Delete one conversation
const deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation ID",
      });
    }

    const conversation = await Conversation.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    console.error("Delete conversation error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to delete conversation",
    });
  }
};

// Send a message and stream the AI response
const sendMessage = async (req, res) => {
  let reader;

  try {
    const { id } = req.params;
    const { message } = req.body;

    // Validate conversation ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation ID",
      });
    }

    // Validate message
    if (
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    if (message.length > 10000) {
      return res.status(400).json({
        success: false,
        message: "Message is too long",
      });
    }

    const trimmedMessage = message.trim();

    // Find conversation owned by the logged-in user
    const conversation = await Conversation.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    // Prepare previous messages for FastAPI
    const history = conversation.messages.map((item) => ({
      role: item.role,
      content: item.content,
    }));

    // Contact FastAPI before sending streaming headers
    const aiResponse = await generateChatResponse(
      trimmedMessage,
      history
    );

    if (!aiResponse.body) {
      throw new Error("FastAPI returned an empty response stream");
    }

    // Save the user's message
    conversation.messages.push({
      role: "user",
      content: trimmedMessage,
    });

    // Generate title from the first user message
    const userMessages = conversation.messages.filter(
      (item) => item.role === "user"
    );

    if (
      userMessages.length === 1 &&
      conversation.title === "New conversation"
    ) {
      conversation.title = trimmedMessage.slice(0, 50);
    }

    await conversation.save();

    // Set streaming response headers
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("X-Content-Type-Options", "nosniff");

    let fullResponse = "";

    reader = aiResponse.body.getReader();

    // Create one decoder for the entire stream.
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      // Correctly decode multi-byte characters across chunks.
      const chunk = decoder.decode(value, { stream: true });

      if (!chunk) continue;

      fullResponse += chunk;

      // Forward each chunk to React immediately.
      if (!res.write(chunk)) {
        await new Promise((resolve, reject) => {
          res.once("drain", resolve);
          res.once("error", reject);
          res.once("close", () => {
            reject(new Error("Client disconnected"));
          });
        });
      }
    }

    // Flush any remaining bytes from the decoder.
    const finalChunk = decoder.decode();

    if (finalChunk) {
      fullResponse += finalChunk;
      res.write(finalChunk);
    }

    // Save the assistant message after successful completion.
    if (fullResponse.trim()) {
      conversation.messages.push({
        role: "assistant",
        content: fullResponse,
      });

      await conversation.save();
    }

    res.end();
  } catch (error) {
    console.error("Send chat message error:", error.message);

    if (res.headersSent) {
      if (!res.destroyed) {
        res.destroy(error);
      }
      return;
    }

    res.status(502).json({
      success: false,
      message: "Unable to generate chatbot response",
    });
  } finally {
    if (reader) {
      try {
        reader.releaseLock();
      } catch (error) {
        console.error("Stream cleanup error:", error.message);
      }
    }
  }
};

module.exports = {
  createConversation,
  getConversations,
  getConversationById,
  deleteConversation,
  sendMessage,
};
