const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to MindEase API",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "MindEase backend is running",
  });
});

// Start server only after MongoDB connects
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`MindEase backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server could not start.");
  }
};

startServer();