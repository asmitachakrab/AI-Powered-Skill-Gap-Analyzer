import React from "react";

function RecommendationCard({ text }) {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>AI</div>
      <p style={styles.text}>{text}</p>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    border: "1px solid rgba(99, 102, 241, 0.14)",
    padding: "16px",
    marginBottom: "12px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #f8faff, #eef2ff)",
    boxShadow: "0 10px 24px rgba(79, 70, 229, 0.08)"
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #312e81, #7c3aed)",
    color: "#ffffff",
    fontSize: "0.9rem",
    fontWeight: 700,
    flexShrink: 0
  },
  text: {
    margin: 0,
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "#1f2937"
  }
};

export default RecommendationCard;
