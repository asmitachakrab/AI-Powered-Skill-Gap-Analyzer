const express = require("express");
const router = express.Router();

const { analyze } = require("../controllers/analysisController");
const authMiddleware = require("../middleware/authMiddleware");

// 🔒 Skill Gap Analysis (AI Logic)
router.get("/", authMiddleware, analyze);

module.exports = router;