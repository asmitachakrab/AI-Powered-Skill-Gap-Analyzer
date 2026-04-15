const User = require("../models/User");

// 👤 SAVE / UPDATE PROFILE
exports.saveProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      current_role,
      experience_level,
      education,
      interests
    } = req.body;

    // Basic validation
    if (!current_role || !experience_level || !education) {
      return res.status(400).json({
        error: "Please fill all required fields"
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        current_role,
        experience_level,
        education,
        interests
      },
      { new: true }
    ).select("-password"); // 🔐 remove password

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 👤 GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};