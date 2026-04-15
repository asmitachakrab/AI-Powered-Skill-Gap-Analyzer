import React from "react";

function RoadmapStep({ step }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3>Step {step.step}</h3>
        <span style={styles.timeline}>{step.timeline}</span>
      </div>

      <p><strong>Skill:</strong> {step.skill}</p>
      <p>{step.description}</p>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "12px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  timeline: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px"
  }
};

export default RoadmapStep;