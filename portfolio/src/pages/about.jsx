/* eslint-disable no-unused-vars */
import React from "react";
import {
  FaLaptopCode,
  FaServer,
  FaCode,
  FaMobile,
} from "react-icons/fa";
import Layout from "../components/layout";

const services = [
  {
    icon: FaLaptopCode,
    title: "Web Development",
    description: "High-quality development of websites at the professional level.",
  },
  {
    icon: FaServer,
    title: "Backend Development",
    description: "High-performance backend services for scalability and security.",
  },
  {
    icon: FaCode,
    title: "C / C++",
    description: "Pursuing DSA and Algorithms, Competitive Programming, and System Programming.",
  },
  {
    icon: FaMobile,
    title: "Flutter Development",
    description: "Flutter app development for Android and iOS with a focus on performance and UX.",
  },
];

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="service-card">
    <div className="service-icon-wrap">
      <Icon />
    </div>
    <p className="service-title">{title}</p>
    <p className="service-desc">{description}</p>
  </div>
);

const About = () => {
  return (
    <Layout>
      {/* Bio */}
      <p className="about-text">
        Hi! I'm <strong>Ansh Shinde</strong>, a passionate Computer Engineering student at Shree L.R. Tiwari
        College of Engineering. I enjoy building practical and impactful tech solutions, especially in{" "}
        <strong>Flutter</strong>, <strong>React</strong>, and <strong>Firebase</strong>. I'm currently working
        on a Smart Classroom Tracker App to help students find available rooms for study—combining real-time
        data and smart design to solve real campus problems.
      </p>
      <p className="about-text" style={{ marginTop: "16px" }}>
        I love exploring the power of <strong>AI integration</strong>—recently working on integrating Hume
        AI's empathic voice API into React Native for emotionally aware applications. I'm constantly learning,
        experimenting, and building, whether it's a voice-based chatbot, a portfolio in Vite + React, or
        diving deep into LLMs and backend architectures.
      </p>
      <p className="about-text" style={{ marginTop: "16px" }}>
        Let's connect and build something amazing!
      </p>

      {/* What I'm Doing */}
      <h4
        style={{
          fontFamily: "var(--font-head)",
          fontWeight: 700,
          fontSize: "1rem",
          color: "var(--text-primary)",
          marginTop: "40px",
          marginBottom: "20px",
          letterSpacing: "-0.01em",
        }}
      >
        What I'm Doing
      </h4>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {services.map((s) => (
          <ServiceCard key={s.title} {...s} />
        ))}
      </div>
    </Layout>
  );
};

export default About;
