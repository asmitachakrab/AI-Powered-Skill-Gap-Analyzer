import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import SkillCard from "../components/SkillCard";
import Loader from "../components/Loader";
import "./skills.css";

function Skills() {
  const navigate = useNavigate();
  const [skillName, setSkillName] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // future: fetch skills
  }, []);

  const addSkill = async () => {
    if (!skillName.trim()) return;

    setLoading(true);
    setMessage("");

    const newSkill = { name: skillName, level };

    try {
      await API.post("/skills", newSkill);

      setSkills((prev) => [...prev, newSkill]);
      setSkillName("");
      setLevel("Beginner");
      setMessage("✅ Skill added");
    } catch {
      setMessage("❌ Error adding skill");
    } finally {
      setLoading(false);
    }
  };

  const removeSkill = async (index) => {
    setLoading(true);
    setMessage("");

    try {
      await API.delete(`/skills/${index}`);

      const updated = skills.filter((_, i) => i !== index);
      setSkills(updated);
    } catch {
      setMessage("❌ Error removing skill");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="skills-container">
      <h2>🛠️ Skills Management</h2>

      {/* Add Skill */}
      <div className="skills-form">
        <input
          type="text"
          placeholder="Enter Skill"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          className="skills-input"
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="skills-input"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Expert</option>
        </select>

        <button onClick={addSkill} className="skills-button">
          Add Skill
        </button>
      </div>

      <div className="skills-actions">
        <button
          type="button"
          className="skills-dashboard-button"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>

      {/* Skill List */}
      <div className="skills-list-container">
        <h3>Your Skills</h3>

        {skills.length === 0 ? (
          <p>No skills added yet</p>
        ) : (
          skills.map((skill, index) => (
            <SkillCard
              key={index}
              skill={skill}
              onDelete={() => removeSkill(index)}
            />
          ))
        )}
      </div>

      {message && (
        <p className={message.includes("❌") ? "skills-error" : "skills-success"}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Skills;
