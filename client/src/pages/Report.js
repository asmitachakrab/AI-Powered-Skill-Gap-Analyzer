import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import "./report.css";

function Report() {
  const [loading, setLoading] = useState(false);

  // Dummy data (later from backend)
  const [reportData, setReportData] = useState({
    career: "Web Developer",
    skills: ["HTML", "CSS"],
    missingSkills: ["JavaScript", "React", "Node.js"],
    roadmap: [
      { step: 1, skill: "JavaScript", timeline: "1 Month" },
      { step: 2, skill: "React", timeline: "2 Month" },
      { step: 3, skill: "Node.js", timeline: "3 Month" }
    ]
  });

  useEffect(() => {
    // future: fetch report
  }, []);

  const downloadJSON = () => {
    setLoading(true);

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(reportData, null, 2));

    const link = document.createElement("a");
    link.href = dataStr;
    link.download = "career_report.json";
    link.click();

    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="report-container">
      <h2>📄 Career Report</h2>

      {/* Career */}
      <div className="report-section">
        <h3>🎯 Career Goal</h3>
        <p>{reportData.career}</p>
      </div>

      {/* Skills */}
      <div className="report-section">
        <h3>🛠️ Your Skills</h3>
        <ul>
          {reportData.skills.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Skill Gap */}
      <div className="report-section">
        <h3>❌ Skill Gap</h3>
        <ul>
          {reportData.missingSkills.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Roadmap */}
      <div className="report-section">
        <h3>🛤️ Roadmap</h3>
        {reportData.roadmap.map((r) => (
          <div key={r.step}>
            Step {r.step}: {r.skill} ({r.timeline})
          </div>
        ))}
      </div>

      {/* Download Button */}
      <button onClick={downloadJSON} className="report-button">
        ⬇️ Download Report (JSON)
      </button>
    </div>
  );
}

export default Report;