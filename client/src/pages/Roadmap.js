import React, { useEffect, useState } from "react";
import RoadmapStep from "../components/RoadmapStep";
import Loader from "../components/Loader";
import "./roadmap.css";

function Roadmap() {
  const [career, setCareer] = useState("Web Developer");
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dummy missing skills (later from backend)
  const missingSkills = ["JavaScript", "React", "Node.js"];

  useEffect(() => {
    generateRoadmap();
  }, []);

  const generateRoadmap = () => {
    setLoading(true);

    const plan = missingSkills.map((skill, index) => ({
      step: index + 1,
      skill,
      timeline: `${index + 1} Month`,
      description: `Learn ${skill} from basics to advanced`
    }));

    setRoadmap(plan);

    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="roadmap-container">
      <h2>🛤️ Career Roadmap</h2>

      {/* Career */}
      <div className="roadmap-step">
        <h3>🎯 Target Career</h3>
        <p>{career}</p>
      </div>

      {/* Roadmap */}
      {roadmap.length === 0 ? (
        <p>No roadmap available</p>
      ) : (
        roadmap.map((item) => (
          <RoadmapStep key={item.step} step={item} />
        ))
      )}
    </div>
  );
}

export default Roadmap;