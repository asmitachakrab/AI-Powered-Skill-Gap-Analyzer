import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth
import Login from "./pages/Login";
import Register from "./pages/Register";

// Core
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Skills from "./pages/Skills";
import Career from "./pages/Career";
import Analysis from "./pages/Analysis";
import Roadmap from "./pages/Roadmap";
import Report from "./pages/Report";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main Modules */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/career" element={<Career />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;