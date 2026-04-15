const Skill = require("../models/Skill");

// ➕ ADD SKILL
exports.addSkill = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, level } = req.body;

    const skill = await Skill.create({
      userId,
      name,
      level
    });

    res.status(201).json({
      message: "Skill added",
      skill
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📥 GET ALL SKILLS FOR USER
exports.getSkills = async (req, res) => {
  try {
    const userId = req.user.id;

    const skills = await Skill.find({ userId });

    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ DELETE SKILL
exports.deleteSkill = async (req, res) => {
  try {
    const skillId = req.params.id;

    await Skill.findByIdAndDelete(skillId);

    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};