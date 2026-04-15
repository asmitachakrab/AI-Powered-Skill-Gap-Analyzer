const Skill = require("../models/Skill");
const Career = require("../models/Career");
const User = require("../models/User");

// 🛤️ GENERATE ROADMAP
exports.generateRoadmap = async (req, res) => {
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

    // 5️⃣ Generate roadmap
    const roadmap = gapSkills.map((skill, index) => ({
      step: index + 1,
      skill,
      timeline: `${index + 1} Month`,
      description: `Learn ${skill} from basics to advanced`
    }));

    res.json({
      career: user.current_role,
      roadmap
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};