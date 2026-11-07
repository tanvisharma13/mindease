const Journal = require("../models/Journal");

// Create journal entry
const createJournal = async (req, res) => {
  try {
    const { title, content, prompt, mood, entryDate } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Journal content is required",
      });
    }

    const journal = await Journal.create({
      user: req.user.id,
      title: title || "Untitled Entry",
      content,
      prompt: prompt || "",
      mood: mood || "",
      ...(entryDate ? { entryDate } : {}),
    });

    res.status(201).json({
      success: true,
      message: "Journal entry created successfully",
      journal,
    });
  } catch (error) {
    console.error("Create journal error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to create journal entry",
    });
  }
};

// Get all journal entries
const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({
      user: req.user.id,
    }).sort({ entryDate: -1 });

    res.status(200).json({
      success: true,
      count: journals.length,
      journals,
    });
  } catch (error) {
    console.error("Get journals error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve journal entries",
    });
  }
};

// Get one journal entry
const getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: "Journal entry not found",
      });
    }

    res.status(200).json({
      success: true,
      journal,
    });
  } catch (error) {
    console.error("Get journal error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve journal entry",
    });
  }
};

// Update journal entry
const updateJournal = async (req, res) => {
  try {
    const { title, content, prompt, mood, entryDate } = req.body;

    const journal = await Journal.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: "Journal entry not found",
      });
    }

    if (title !== undefined) journal.title = title;
    if (content !== undefined) journal.content = content;
    if (prompt !== undefined) journal.prompt = prompt;
    if (mood !== undefined) journal.mood = mood;
    if (entryDate !== undefined) journal.entryDate = entryDate;

    await journal.save();

    res.status(200).json({
      success: true,
      message: "Journal entry updated successfully",
      journal,
    });
  } catch (error) {
    console.error("Update journal error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to update journal entry",
    });
  }
};

// Delete journal entry
const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: "Journal entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Journal entry deleted successfully",
    });
  } catch (error) {
    console.error("Delete journal error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to delete journal entry",
    });
  }
};

module.exports = {
  createJournal,
  getJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
};