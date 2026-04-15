import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";
import "./career.css";

function Career() {
  const navigate = useNavigate();
  const [career, setCareer] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const careerOptions = [
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Data Analyst",
    "AI Engineer",
    "Machine Learning Engineer",
    "Cloud Engineer",
    "DevOps Engineer",
    "Cybersecurity Analyst",
    "Mobile App Developer",
    "Software Engineer",
    "Game Developer",
    "UI/UX Designer",
    "Blockchain Developer",
    "Database Administrator",
    "Network Engineer",
    "AI Researcher",
    "Product Manager"
  ];

  useEffect(() => {
    // later: GET /career
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!career) {
      return setMessage("❌ Please select a career");
    }

    setLoading(true);

    try {
      await API.post("/career", { careerGoal: career });
      setMessage("✅ Career goal saved");
    } catch {
      setMessage("❌ Error saving career");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="career-container">
      <h2>🎯 Select Career Goal</h2>

      <form onSubmit={handleSubmit} className="career-form">
        <select
          value={career}
          onChange={(e) => setCareer(e.target.value)}
          className="career-select"
        >
          <option value="">-- Select Career --</option>
          {careerOptions.map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button type="submit" className="career-button" disabled={loading}>
          Save Career Goal
        </button>

        <button
          type="button"
          className="career-dashboard-button"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
      </form>

      {message && (
        <p className={message.includes("❌") ? "career-error" : "career-success"}>
          {message}
        </p>
      )}

      {/* Preview */}
      {career && (
        <div className="career-preview">
          <h3>Selected Career:</h3>
          <p>{career}</p>
        </div>
      )}
    </div>
  );
}

export default Career;
