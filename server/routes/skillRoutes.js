const express = require("express");
const router = express.Router();

const {
  addSkill,
  getSkills,
  deleteSkill
} = require("../controllers/skillController");

const authMiddleware = require("../middleware/authMiddleware");

// 🔒 Add Skill
router.post("/", authMiddleware, addSkill);

// 🔒 Get Skills
router.get("/", authMiddleware, getSkills);

// 🔒 Delete Skill
router.delete("/:id", authMiddleware, deleteSkill);

module.exports = router;