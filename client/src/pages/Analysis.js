import React, { useEffect, useState } from "react";
import RecommendationCard from "../components/RecommendationCard";
import CourseCard from "../components/CourseCard";
import Loader from "../components/Loader";
import "./analysis.css";

function Analysis() {
  const [career, setCareer] = useState("Web Developer");
  const [userSkills, setUserSkills] = useState(["HTML", "CSS"]);
  const [gapSkills, setGapSkills] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const careerSkills = {
    "Web Developer": ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    "Data Scientist": ["Python", "Machine Learning", "Statistics", "SQL"],
    "AI Engineer": ["Python", "Deep Learning", "NLP", "TensorFlow"]
  };

  useEffect(() => {
    analyzeSkills();
  }, []);

  const analyzeSkills = () => {
    setLoading(true);

    const required = careerSkills[career] || [];

    const missing = required.filter(
      (skill) => !userSkills.includes(skill)
    );

    setGapSkills(missing);

    // Recommendations
    const recs = missing.map(
      (skill) => `Learn ${skill} to improve your ${career} profile`
    );
    setRecommendations(recs);

    // Courses
    const courseList = missing.map((skill) => ({
      skill,
      course: `${skill} Complete Course - Udemy`
    }));
    setCourses(courseList);

    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="analysis-container">
      <h2>🧠 Skill Gap Analysis</h2>

      {/* Career */}
      <div className="analysis-card">
        <h3>🎯 Target Career</h3>
        <p>{career}</p>
      </div>

      {/* User Skills */}
      <div className="analysis-card">
        <h3>🛠️ Your Skills</h3>
        <ul>
          {userSkills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* Skill Gap */}
      <div className="analysis-card">
        <h3>❌ Missing Skills</h3>
        {gapSkills.length === 0 ? (
          <p>No gaps 🎉</p>
        ) : (
          <ul>
            {gapSkills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Recommendations */}
      <div className="analysis-card">
        <h3>🤖 AI Recommendations</h3>
        {recommendations.map((rec, i) => (
          <RecommendationCard key={i} text={rec} />
        ))}
      </div>

      {/* Courses */}
      <div className="analysis-card">
        <h3>📚 Course Suggestions</h3>
        {courses.map((c, i) => (
          <CourseCard key={i} skill={c.skill} course={c.course} />
        ))}
      </div>
    </div>
  );
}

export default Analysis;