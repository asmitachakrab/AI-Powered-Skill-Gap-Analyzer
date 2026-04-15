import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>AI Career Roadmap</h2>

      <div style={styles.links}>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button onClick={() => navigate("/skills")}>Skills</button>
        <button onClick={() => navigate("/career")}>Career</button>
        <button onClick={() => navigate("/analysis")}>Analysis</button>
        <button onClick={() => navigate("/roadmap")}>Roadmap</button>
        <button onClick={() => navigate("/report")}>Report</button>
        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    backgroundColor: "#1e1e2f",
    color: "#fff"
  },
  logo: {
    margin: 0
  },
  links: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },
  logout: {
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    padding: "8px",
    cursor: "pointer"
  }
};

export default Navbar;