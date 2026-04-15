const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

// DB connection
const connectDB = require("./config/db");
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
  res.send("🚀 API is running successfully");
});

// Routes (we will create these step-by-step)
app.use("/api/auth", require("./routes/authRoutes"));

// Future modules (keep placeholders ready)
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/career", require("./routes/careerRoutes"));
app.use("/api/analysis", require("./routes/analysisRoutes"));
app.use("/api/roadmap", require("./routes/roadmapRoutes"));
app.use("/api/report", require("./routes/reportRoutes"));

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});