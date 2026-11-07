const Mood = require("../models/Mood");
const Journal = require("../models/Journal");

// Get dashboard information
const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const [
      latestMood,
      journalCount,
      latestJournals,
      recentMoods,
    ] = await Promise.all([
      Mood.findOne({ user: userId }).sort({ date: -1 }),

      Journal.countDocuments({ user: userId }),

      Journal.find({ user: userId })
        .sort({ entryDate: -1 })
        .limit(5),

      Mood.find({ user: userId })
        .sort({ date: -1 })
        .limit(7),
    ]);

    res.status(200).json({
      success: true,
      dashboard: {
        latestMood,
        journalCount,
        latestJournals,
        recentMoods,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to load dashboard",
    });
  }
};

module.exports = {
  getDashboard,
};