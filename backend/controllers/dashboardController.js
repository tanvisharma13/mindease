
const Mood = require("../models/Mood");
const Journal = require("../models/Journal");

// Get dashboard information
const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Calculate the beginning of the last 7 calendar days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Fetch dashboard information simultaneously
    const [
      latestMood,
      journalCount,
      latestJournals,
      recentMoods,
    ] = await Promise.all([

      // Get the latest mood entry
      Mood.findOne({
        user: userId,
      }).sort({ date: -1 }),

      // Count all journal entries
      Journal.countDocuments({
        user: userId,
      }),

      // Get the five latest journal entries
      Journal.find({
        user: userId,
      })
        .sort({ entryDate: -1 })
        .limit(5),

      // Get all mood entries from the last 7 calendar days
      Mood.find({
        user: userId,
        date: {
          $gte: sevenDaysAgo,
        },
      }).sort({ date: 1 }),

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
