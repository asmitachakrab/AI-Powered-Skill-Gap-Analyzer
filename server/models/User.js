const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },

    // Extra fields (for your project)
    current_role: String,
    experience_level: String,
    education: String,
    interests: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);