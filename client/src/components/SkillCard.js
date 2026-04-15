import React from "react";

function SkillCard({ skill, onDelete }) {
  return (
    <div style={styles.card}>
      <div>
        <h4 style={styles.name}>{skill.name}</h4>
        <p style={styles.level}>{skill.level}</p>
      </div>

      <button
        onClick={onDelete}
        style={styles.deleteBtn}
      >
        ❌
      </button>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    backgroundColor: "#fff"
  },
  name: {
    margin: 0
  },
  level: {
    margin: 0,
    color: "#555"
  },
  deleteBtn: {
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    padding: "6px",
    cursor: "pointer"
  }
};

export default SkillCard;