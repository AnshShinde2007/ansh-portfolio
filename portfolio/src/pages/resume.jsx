// src/pages/resume.jsx
import React from "react";
import Layout from "../components/layout";

const ResumeCard = ({ title, subtitle, description }) => (
  <div className="resume-card">
    <p className="resume-card-title">{title}</p>
    <p className="resume-card-subtitle">{subtitle}</p>
    <p className="resume-card-desc">{description}</p>
  </div>
);

const Resume = () => {
  return (
    <Layout>
      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "28px", lineHeight: 1.75 }}>
        Below is a summary of my education and work experience. Feel free to download my resume for more details.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
        {/* Experience */}
        <div>
          <p className="resume-section-title">Experience</p>
          <ResumeCard
            title="Flutter Developer — Soul Yatri"
            subtitle="2025 – Present"
            description="Building frontend of a Mental wellness app using Flutter, integrating APIs, and collaborating with designers."
          />
        </div>

        {/* Education */}
        <div>
          <p className="resume-section-title">Education</p>
          <ResumeCard
            title="B.E. in Computer Science"
            subtitle="2023 – 2027"
            description="University of Mumbai – Focused on software engineering, app development, and project-based learning."
          />
          <ResumeCard
            title="Higher Secondary Education"
            subtitle="2021 – 2023"
            description="Maharashtra State Board – Completed with distinction, specialized in PCM + CS."
          />
        </div>
      </div>

      {/* Download Button */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <a
          href="https://drive.google.com/file/d/1jvLsGpWYTjQGwAGKGRhQxhyB_BrbMZkc/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="download-btn"
        >
          ↓ Download Resume
        </a>
      </div>
    </Layout>
  );
};

export default Resume;
