const express = require("express");
const router = express.Router();

const { generateRoadmap } = require("../controllers/roadmapController");
const authMiddleware = require("../middleware/authMiddleware");

// 🔒 Generate Roadmap
router.get("/", authMiddleware, generateRoadmap);

module.exports = router;