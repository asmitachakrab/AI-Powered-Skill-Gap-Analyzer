const express = require("express");
const router = express.Router();

const {
  saveProfile,
  getProfile
} = require("../controllers/profileController");

const authMiddleware = require("../middleware/authMiddleware");

// 🔒 Save / Update Profile
router.post("/", authMiddleware, saveProfile);

// 🔒 Get Profile
router.get("/", authMiddleware, getProfile);

module.exports = router;