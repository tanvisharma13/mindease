const Mood = require("../models/Mood");

// Add a new mood entry
const createMood = async (req, res) => {
  try {
    const { mood, factors, note, date } = req.body;

    if (!mood || typeof mood !== "string" || !mood.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please select a mood",
      });
    }

    const moodEntry = await Mood.create({
      user: req.user.id,
      mood: mood.trim(),
      factors: Array.isArray(factors) ? factors : [],
      note: note || "",
      ...(date ? { date } : {}),
    });

    res.status(201).json({
      success: true,
      message: "Mood saved successfully",
      mood: moodEntry,
    });
  } catch (error) {
    console.error("Create mood error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to save mood",
    });
  }
};

// Get all moods of logged-in user
const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: moods.length,
      moods,
    });
  } catch (error) {
    console.error("Get moods error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve moods",
    });
  }
};

// Get mood summary for the last seven days
const getMoodSummary = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const moods = await Mood.find({
      user: req.user.id,
      date: { $gte: sevenDaysAgo },
    }).sort({ date: 1 });

    const moodCounts = {};

    moods.forEach((entry) => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      totalEntries: moods.length,
      moodCounts,
      moods,
    });
  } catch (error) {
    console.error("Mood summary error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to generate mood summary",
    });
  }
};

// Update a mood entry
const updateMood = async (req, res) => {
  try {
    const { mood, factors, note, date } = req.body;

    const moodEntry = await Mood.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!moodEntry) {
      return res.status(404).json({
        success: false,
        message: "Mood entry not found",
      });
    }

    if (mood !== undefined) moodEntry.mood = mood;
    if (factors !== undefined) moodEntry.factors = factors;
    if (note !== undefined) moodEntry.note = note;
    if (date !== undefined) moodEntry.date = date;

    await moodEntry.save();

    res.status(200).json({
      success: true,
      message: "Mood updated successfully",
      mood: moodEntry,
    });
  } catch (error) {
    console.error("Update mood error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to update mood",
    });
  }
};

// Delete a mood entry
const deleteMood = async (req, res) => {
  try {
    const moodEntry = await Mood.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!moodEntry) {
      return res.status(404).json({
        success: false,
        message: "Mood entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Mood deleted successfully",
    });
  } catch (error) {
    console.error("Delete mood error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to delete mood",
    });
  }
};

module.exports = {
  createMood,
  getMoods,
  getMoodSummary,
  updateMood,
  deleteMood,
};