const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      trim: true,
      default: "Untitled Entry",
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    prompt: {
      type: String,
      default: "",
    },

    mood: {
      type: String,
      default: "",
    },

    entryDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;