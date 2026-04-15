import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChartComponent from "../components/ChartComponent";
import ProgressBar from "../components/ProgressBar";
import RecommendationCard from "../components/RecommendationCard";
import Loader from "../components/Loader";
import API from "../services/api";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [careerGoal, setCareerGoal] = useState("");
  const [skills, setSkills] = useState([]);
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [skillGap, setSkillGap] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      setError("");

      try {
        const [careerRes, skillsRes] = await Promise.all([
          API.get("/career"),
          API.get("/skills")
        ]);

        const savedCareer = careerRes.data?.careerGoal || "";
        const savedSkills = skillsRes.data || [];

        setCareerGoal(savedCareer);
        setSkills(savedSkills);

        if (!savedCareer || savedSkills.length === 0) {
          setRequiredSkills([]);
          setProgressData([]);
          setSkillGap([]);
          setRecommendations([]);
          return;
        }

        const analysisRes = await API.get("/analysis");

        setRequiredSkills(analysisRes.data?.requiredSkills || []);
        setProgressData(analysisRes.data?.progressData || []);
        setSkillGap(analysisRes.data?.gapSkills || []);
        setRecommendations(analysisRes.data?.recommendations || []);
      } catch (err) {
        setError(
          err.response?.data?.msg ||
          err.response?.data?.error ||
          "Unable to load dashboard data right now."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const needsCareer = !careerGoal;
  const needsSkills = skills.length === 0;
  const showInsights = !needsCareer && !needsSkills;
  const sectionTitle = showInsights
    ? "Insights"
    : needsCareer
      ? "Start With Your Career Goal"
      : "Add Skills For AI Gap Analysis";
  const sectionDescription = showInsights
    ? "Track your saved career goals, required skills, gaps, and personalized recommendations."
    : needsCareer
      ? "Choose your target career first so the app knows which required skills to compare against."
      : "Now add your existing skills so AI can analyze the gap between what you know and what your target career requires.";
  const personalizedRecommendations =
    recommendations.length > 0
      ? recommendations
      : skillGap.map(
          (skill) =>
            `Build one practical ${skill} project next so your profile gets closer to a ${careerGoal} role.`
        );

  return (
    <div className="dashboard-container">
      <div className="dashboard-navbar">
        <h2>AI Powered Skillgap Analyzer</h2>

        <div className="nav-links">
          <button type="button" onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button type="button" onClick={() => navigate("/skills")}>Skills</button>
          <button type="button" onClick={() => navigate("/career")}>Career</button>
          <button type="button" onClick={() => navigate("/analysis")}>Analysis</button>
          <button type="button" onClick={() => navigate("/roadmap")}>Roadmap</button>
          <button type="button" onClick={() => navigate("/report")}>Report</button>
          <button type="button" onClick={() => navigate("/profile")}>Profile</button>
        </div>
      </div>

      <h1 className="dashboard-title">Your Dashboard</h1>

      {error && <p className="dashboard-error">{error}</p>}

      <section className="dashboard-section">
        <div className="section-heading">
          <h2>{sectionTitle}</h2>
          <p>{sectionDescription}</p>
        </div>

        {!showInsights && (
          <div className="dashboard-grid dashboard-setup-grid">
            {needsCareer && (
              <button
                type="button"
                className="dashboard-card dashboard-action-card"
                onClick={() => navigate("/career")}
              >
                <h3>Add Career</h3>
                <p>Select your target career first to unlock the skill-gap analysis flow.</p>
                <span className="dashboard-action-link">Open Career Page</span>
              </button>
            )}

            {!needsCareer && needsSkills && (
              <button
                type="button"
                className="dashboard-card dashboard-action-card"
                onClick={() => navigate("/skills")}
              >
                <h3>Add Skills</h3>
                <p>Add the skills you already know so AI can compare them with the required skills for your chosen career.</p>
                <span className="dashboard-action-link">Open Skills Page</span>
              </button>
            )}
          </div>
        )}

        {showInsights && (
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Selected Career</h3>
              <p className="dashboard-highlight">{careerGoal}</p>
              <p>{skills.length} saved skill{skills.length === 1 ? "" : "s"}</p>
            </div>

            <div className="dashboard-card">
              <h3>Your Saved Skills</h3>
              <ul>
                {skills.map((skill, index) => (
                  <li key={skill._id || index}>
                    <strong>{skill.name}</strong>
                    {skill.level ? ` - ${skill.level}` : ""}
                  </li>
                ))}
              </ul>
            </div>

            <div className="dashboard-card">
              <h3>Required Skills</h3>
              <ul>
                {requiredSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="dashboard-card">
              <h3>Skill Gaps</h3>
              {skillGap.length === 0 ? (
                <p>You currently cover all tracked required skills.</p>
              ) : (
                <ul>
                  {skillGap.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="dashboard-card dashboard-card-wide">
              <h3>Skill Progress</h3>
              {progressData.map((item, index) => (
                <div key={index} className="progress-item">
                  <p>{item.skill}</p>
                  <ProgressBar progress={item.progress} />
                </div>
              ))}
            </div>

            <div className="dashboard-card dashboard-card-wide">
              <h3>Visualization</h3>
              <ChartComponent
                progressData={progressData}
                requiredSkills={requiredSkills}
                gapSkills={skillGap}
              />
            </div>

            <div className="dashboard-card dashboard-card-wide">
              <h3>Personalized Recommendations</h3>
              <p className="dashboard-recommendation-intro">
                Based on your saved skills and your goal of becoming a {careerGoal}, these are the best next moves.
              </p>
              {personalizedRecommendations.length === 0 ? (
                <p>Add more profile data to unlock personalized recommendations.</p>
              ) : (
                personalizedRecommendations.map((rec, index) => (
                  <RecommendationCard key={index} text={rec} />
                ))
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
