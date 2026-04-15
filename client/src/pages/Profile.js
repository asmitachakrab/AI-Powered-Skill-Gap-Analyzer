import React, { useState, useEffect } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import "./profile.css";

function Profile() {
  const [form, setForm] = useState({
    education: "",
    experience: "",
    interests: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // future: fetch profile
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await API.post("/profile", {
        ...form,
        interests: form.interests.split(",").map((i) => i.trim())
      });

      setMessage("✅ Profile saved successfully");
    } catch {
      setMessage("❌ Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="profile-container">
      <h2>👤 User Profile</h2>

      <form onSubmit={handleSubmit} className="profile-form">
        <textarea
          name="education"
          placeholder="Enter Education"
          value={form.education}
          onChange={handleChange}
          className="profile-input"
        />

        <textarea
          name="experience"
          placeholder="Enter Experience"
          value={form.experience}
          onChange={handleChange}
          className="profile-input"
        />

        <input
          type="text"
          name="interests"
          placeholder="Enter Interests (comma separated)"
          value={form.interests}
          onChange={handleChange}
          className="profile-input"
        />

        <button
          type="submit"
          className="profile-button"
          disabled={loading}
        >
          Save Profile
        </button>
      </form>

      {message && (
        <p className={message.includes("❌") ? "profile-error" : "profile-success"}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Profile;