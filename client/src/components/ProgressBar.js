import React from "react";

function ProgressBar({ progress }) {
  return (
    <div style={styles.container}>
      <div style={styles.label}>
        <span>Progress</span>
        <span>{progress}%</span>
      </div>

      <div style={styles.bar}>
        <div
          style={{
            ...styles.fill,
            width: `${progress}%`
          }}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    marginTop: "10px"
  },
  label: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "5px",
    fontSize: "14px"
  },
  bar: {
    width: "100%",
    height: "12px",
    backgroundColor: "#ddd",
    borderRadius: "6px",
    overflow: "hidden"
  },
  fill: {
    height: "100%",
    backgroundColor: "#28a745",
    transition: "width 0.5s ease-in-out"
  }
};

export default ProgressBar;