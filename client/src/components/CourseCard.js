import React from "react";

function CourseCard({ skill, course }) {
  return (
    <div style={styles.card}>
      <div>
        <h4 style={styles.skill}>{skill}</h4>
        <p style={styles.course}>{course}</p>
      </div>

      <button style={styles.button}>
        View
      </button>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ddd",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
  },
  skill: {
    margin: 0
  },
  course: {
    margin: 0,
    fontSize: "14px",
    color: "#555"
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "4px"
  }
};

export default CourseCard;