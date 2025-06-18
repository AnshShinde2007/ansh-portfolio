  /* eslint-disable no-unused-vars */
  import React from "react";
  import {
    FaMobileAlt,
    FaLaptopCode,
    FaPencilRuler,
    FaServer,
    FaMobile,
    FaCode,
  } from "react-icons/fa";

  const ServiceCard = ({ icon: Icon, title, description }) => (
    <div className="bg-dark rounded-4 text-center p-4 h-100 shadow-sm">
      <Icon className="text-warning fs-1 mb-3" />
      <h5 className="text-white fw-semibold mb-2">{title}</h5>
      <p className="text-light small">{description}</p>
    </div>
  );

  const About = () => {
    return (
      <div className="bg-secondary bg-opacity-10 rounded-4 p-4 mt-3 mx-auto" style={{ maxWidth: "1000px" }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-4">
          <div>
            <h2 className="text-white mb-0">About Me</h2>
            <div className="bg-warning" style={{ height: "4px", width: "50px", marginTop: "5px" }}></div>
          </div>
          <nav className="d-none d-md-flex gap-3">
            <a href="#" className="text-warning fw-semibold text-decoration-none">About</a>
            <a href="/resume" className="text-white text-decoration-none">Resume</a>
            <a href="/portfolio" className="text-white text-decoration-none">Portfolio</a>
            <a href="/contact" className="text-white text-decoration-none">Contact</a>
          </nav>
        </div>

        {/* Description */}
        <p className="text-light">
         Hi! I'm Ansh Shinde, a passionate Computer Engineering student at Shree L.R. Tiwari College of Engineering. I enjoy building practical and impactful tech solutions, especially in Flutter, React, and Firebase. I'm currently working on a Smart Classroom Tracker App to help students find available rooms for study—combining real-time data and smart design to solve real campus problems.

I love exploring the power of AI integration—recently working on integrating Hume AI’s empathic voice API into React Native for emotionally aware applications. I'm constantly learning, experimenting, and building, whether it's a voice-based chatbot, a portfolio in Vite + React, or diving deep into LLMs and backend architectures.

Let’s connect and build something amazing!
        </p>

        {/* What I'm Doing */}
        <h4 className="text-white fw-bold mt-5 mb-4">What I'm Doing</h4>
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <ServiceCard
              icon={FaLaptopCode}
              title="Web Development"
              description="High-quality development of websites at the professional level."
            />
          </div>
          <div className="col-12 col-md-6">
            <ServiceCard
              icon={FaServer}
              title="Backend Development"
              description="High-performance backend services for scalability and security."
            />
          </div>
          <div className="col-12 col-md-6">
            <ServiceCard
              icon={FaCode}
              title="C/C++"
              description="Pursuing DSA and Algorithms, Competitive Programming, and System Programming."
            />
          </div>
          <div className="col-12 col-md-6">
            <ServiceCard
              icon={FaMobile}
              title="Flutter Developement"
              description="Flutter app development for Android and iOS with a focus on performance and user experience."
            />
          </div>
        </div>
      </div>
    );
  };

  export default About;
