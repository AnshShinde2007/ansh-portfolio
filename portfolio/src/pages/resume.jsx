import React from "react";

const ResumeCard = ({ title, subtitle, description }) => (
  <div className="card bg-dark text-white mb-3 shadow-sm">
    <div className="card-body">
      <h5 className="card-title fw-semibold">{title}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
      <p className="card-text text-light small">{description}</p>
    </div>
  </div>
);

const Resume = () => {
  return (
    <div className="bg-secondary bg-opacity-10 rounded-4 p-4 mt-3 mx-auto" style={{ maxWidth: "1000px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-4">
        <div>
          <h2 className="text-white mb-0">Resume</h2>
          <div className="bg-warning" style={{ height: "4px", width: "50px", marginTop: "5px" }}></div>
        </div>
        <nav className="d-none d-md-flex gap-3">
          <a href="/" className="text-white text-decoration-none">About</a>
          <a href="#" className="text-warning fw-semibold text-decoration-none">Resume</a>
          <a href="/portfolio" className="text-white text-decoration-none">Portfolio</a>
          <a href="/contact" className="text-white text-decoration-none">Contact</a>
        </nav>
      </div>

      {/* Intro */}
      <p className="text-light mb-4">
        Below is a summary of my education and work experience. Feel free to download my resume for more details.
      </p>

      {/* Resume Sections */}
      <div className="row">
        {/* Experience Section */}
        <div className="col-md-6 mb-4">
          <h4 className="text-warning fw-bold mb-3">Experience</h4>
          <ResumeCard
            title="Flutter Developer - XYZ Solutions"
            subtitle="2023 - Present"
            description="Working on scalable cross-platform apps, integrated APIs, implemented state management using Provider and Riverpod."
          />
          <ResumeCard
            title="Frontend Intern - ABC Tech"
            subtitle="2022 - 2023"
            description="Built responsive web apps using React.js, contributed to UI/UX improvements and dashboard analytics."
          />
        </div>

        {/* Education Section */}
        <div className="col-md-6 mb-4">
          <h4 className="text-warning fw-bold mb-3">Education</h4>
          <ResumeCard
            title="B.E. in Computer Science"
            subtitle="2023 - 2027"
            description="University of Mumbai – Focused on software engineering, app development, and project-based learning."
          />
          <ResumeCard
            title="Higher Secondary Education"
            subtitle="2021 - 2023"
            description="Maharashtra State Board – Completed with distinction, specialized in PCM + CS."
          />
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-5">
        <a href="./assets/AnshShindeResume.pdf" className="btn btn-warning fw-bold px-4" download>
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default Resume;
