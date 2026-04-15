const Skill = require("../models/Skill");
const Career = require("../models/Career");
const User = require("../models/User");

// 🧠 ANALYZE SKILL GAP
exports.analyze = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ Get user
    const user = await User.findById(userId);

    if (!user || !user.current_role) {
      return res.status(400).json({ msg: "Career goal not set" });
    }

    // 2️⃣ Get user skills
    const userSkillsDocs = await Skill.find({ userId });
    const userSkills = userSkillsDocs.map(s => s.name);

    // 3️⃣ Get career requirements
    const career = await Career.findOne({
      role_name: user.current_role
    });

    if (!career) {
      return res.status(400).json({ msg: "Career not found" });
    }

    const requiredSkills = career.required_skills;

    // 4️⃣ Find missing skills
    const gapSkills = requiredSkills.filter(
      skill => !userSkills.includes(skill)
    );

    // 5️⃣ Generate recommendations
    const recommendations = gapSkills.map(
      skill => `Learn ${skill} to become a better ${user.current_role}`
    );

    // 6️⃣ Generate courses (dummy)
    const courses = gapSkills.map(skill => ({
      skill,
      course: `${skill} Complete Course - Udemy`
    }));

    res.json({
      career: user.current_role,
      userSkills,
      requiredSkills,
      gapSkills,
      recommendations,
      courses
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};