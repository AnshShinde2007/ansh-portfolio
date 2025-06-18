// src/pages/portfolio.jsx
import React, { useState } from "react";
import Swift from "../assets/swift.png";
import Feedbacker from "../assets/feedbacker.png";
import Bpower from "../assets/b-power.png";

const projects = [
  { title: "Swift Kart", type: "Web development", image: Swift, link: "https://swiftkaart.netlify.app/" },
  { title: "Feedbacker", type: "Web development", image: Feedbacker, link: "https://feedbacker-app.netlify.app/" },
  { title: "B-power", type: "UI/UX", image: Bpower, link: "https://b-power-int.netlify.app/" },
];

const filters = ["All", "Web development", "UI/UX"];

const ProjectCard = ({ title, type, image, link }) => (
  <div className="col-sm-6 col-md-4">
    <a href={link} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
      <div className="card bg-dark h-100 shadow-sm border-0">
        <div style={{ height: "200px", overflow: "hidden", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}>
          <img
            src={image}
            alt={title}
            className="card-img-top"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title text-white">{title}</h5>
          <p className="card-text text-muted">{type}</p>
        </div>
      </div>
    </a>
  </div>
);

const Portfolio = () => {
  const [selected, setSelected] = useState("All");

  const filteredProjects =
    selected === "All" ? projects : projects.filter((p) => p.type === selected);

  return (
    <div className="bg-secondary bg-opacity-10 rounded-4 p-4 mt-3 mx-auto" style={{ maxWidth: "1000px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-4">
        <div>
          <h2 className="text-white mb-0">Portfolio</h2>
          <div className="bg-warning" style={{ height: "4px", width: "50px", marginTop: "5px" }}></div>
        </div>
        <nav className="d-none d-md-flex gap-3">
          <a href="/" className="text-white text-decoration-none">About</a>
          <a href="/resume" className="text-white text-decoration-none">Resume</a>
          <a href="#" className="text-warning fw-semibold text-decoration-none">Portfolio</a>
          <a href="/contact" className="text-white text-decoration-none">Contact</a>
        </nav>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelected(filter)}
            className={`btn me-2 mb-2 ${selected === filter ? "btn-warning text-dark" : "btn-outline-light"}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="row g-4">
        {filteredProjects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
