import React from "react";
import { Link, useLocation } from "react-router-dom";
import avatar from "../assets/avatar.png";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

const navLinks = [
  { href: "/", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

const ProfileCard = () => {
  const location = useLocation();

  return (
    <div className="profile-card">
      {/* Profile Image & Name */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div className="avatar-ring">
            <img src={avatar} alt="Ansh Shinde avatar" />
          </div>
          <span className="online-dot" title="Available for work" />
        </div>

        <p className="profile-name" style={{ marginTop: "14px" }}>Ansh Shinde</p>
        <span className="profile-badge">Web Developer</span>
      </div>

      <hr className="profile-divider" />

      {/* Contact Info */}
      <div>
        <div className="contact-row">
          <div className="contact-icon-box">
            <FaEnvelope />
          </div>
          <div>
            <span className="contact-label">Email</span>
            <span className="contact-value">
              <a href="mailto:anshshinde449@gmail.com">anshshinde449@gmail.com</a>
            </span>
          </div>
        </div>

        <div className="contact-row">
          <div className="contact-icon-box">
            <FaPhone />
          </div>
          <div>
            <span className="contact-label">Phone</span>
            <span className="contact-value">+91 9137998751</span>
          </div>
        </div>

        <div className="contact-row">
          <div className="contact-icon-box">
            <FaMapMarkerAlt />
          </div>
          <div>
            <span className="contact-label">Location</span>
            <span className="contact-value">Bhayandar, Mumbai</span>
          </div>
        </div>
      </div>

      <hr className="profile-divider" />

      {/* Social Links */}
      <div className="social-row">
        <a
          href="https://www.linkedin.com/in/ansh-shinde-73137b282/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
          title="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/AnshShinde2007"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
          title="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://x.com/AnshShinde14"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
          title="Twitter / X"
        >
          <FaTwitter />
        </a>
      </div>

      {/* Mobile Navigation */}
      <nav className="mobile-nav">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`mobile-nav-btn${location.pathname === link.href ? " active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default ProfileCard;
