// src/pages/portfolio.jsx
import React, { useState } from "react";
import Swift from "../assets/swift.png";
import Feedbacker from "../assets/feedbacker.png";
import Bpower from "../assets/b-power.png";
import Layout from "../components/layout";

const projects = [
  { title: "Swift Kart", type: "Web development", image: Swift, link: "https://swiftkaart.netlify.app/" },
  { title: "Feedbacker", type: "Web development", image: Feedbacker, link: "https://feedbacker-app.netlify.app/" },
  { title: "B-power", type: "UI/UX", image: Bpower, link: "https://b-power-int.netlify.app/" },
];

const filters = ["All", "Web development", "UI/UX"];

const ProjectCard = ({ title, type, image, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
    <div className="project-card">
      <div className="project-img-wrap">
        <img src={image} alt={title} />
        <div className="project-overlay">
          <span>↗ View Project</span>
        </div>
      </div>
      <div className="project-info">
        <p className="project-title">{title}</p>
        <p className="project-type">{type}</p>
      </div>
    </div>
  </a>
);

const Portfolio = () => {
  const [selected, setSelected] = useState("All");

  const filteredProjects =
    selected === "All" ? projects : projects.filter((p) => p.type === selected);

  return (
    <Layout>
      {/* Filter Bar */}
      <div className="filter-bar">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelected(filter)}
            className={`filter-pill${selected === filter ? " active" : ""}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProjects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </Layout>
  );
};

export default Portfolio;
