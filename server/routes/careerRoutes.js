const express = require("express");
const router = express.Router();

const {
  saveCareer,
  getUserCareer,
  getAllCareers
} = require("../controllers/careerController");

const authMiddleware = require("../middleware/authMiddleware");

// 🔒 Save selected career
router.post("/", authMiddleware, saveCareer);

// 🔒 Get user's career
router.get("/", authMiddleware, getUserCareer);

// 🌐 Get all careers (for dropdown)
router.get("/all", getAllCareers);

module.exports = router;