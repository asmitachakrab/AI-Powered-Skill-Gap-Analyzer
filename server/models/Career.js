const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    role_name: {
      type: String,
      required: true,
      unique: true
    },
    required_skills: {
      type: [String],
      required: true
    },
    average_salary: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Career", careerSchema);