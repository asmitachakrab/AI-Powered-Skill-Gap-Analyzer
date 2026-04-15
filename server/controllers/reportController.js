const Skill = require("../models/Skill");
const Career = require("../models/Career");
const User = require("../models/User");

// 📄 GENERATE FULL REPORT
exports.generateReport = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ Get user
    const user = await User.findById(userId).select("-password");

    if (!user || !user.current_role) {
      return res.status(400).json({ msg: "Career goal not set" });
    }

    // 2️⃣ Get skills
    const skillDocs = await Skill.find({ userId });
    const userSkills = skillDocs.map(s => s.name);

    // 3️⃣ Get career data
    const career = await Career.findOne({
      role_name: user.current_role
    });

    if (!career) {
      return res.status(400).json({ msg: "Career not found" });
    }

    const requiredSkills = career.required_skills;

    // 4️⃣ Skill gap
    const gapSkills = requiredSkills.filter(
      skill => !userSkills.includes(skill)
    );

    // 5️⃣ Roadmap
    const roadmap = gapSkills.map((skill, index) => ({
      step: index + 1,
      skill,
      timeline: `${index + 1} Month`
    }));

    // 6️⃣ Final Report
    const report = {
      user,
      career: user.current_role,
      skills: userSkills,
      requiredSkills,
      gapSkills,
      roadmap
    };

    res.json(report);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};