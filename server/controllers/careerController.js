const User = require("../models/User");
const Career = require("../models/Career");

// 🎯 SAVE USER CAREER GOAL
exports.saveCareer = async (req, res) => {
  try {
    const userId = req.user.id;
    const { careerGoal } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { current_role: careerGoal },
      { new: true }
    );

    res.json({
      message: "Career goal saved",
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📥 GET USER CAREER GOAL
exports.getUserCareer = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("current_role");

    res.json({
      careerGoal: user.current_role
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📊 GET ALL CAREERS (for dropdown)
exports.getAllCareers = async (req, res) => {
  try {
    const careers = await Career.find();

    res.json(careers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};