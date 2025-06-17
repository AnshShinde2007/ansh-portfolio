import React from "react";
import avatar from "../assets/avatar.jpeg";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

const ProfileCard = () => {
  return (
    <div
      className="card bg-dark text-white p-4 rounded-4 shadow-sm"
      style={{ width: "260px", minHeight: "92vh" }}
    >
      <div className="d-flex flex-column align-items-center">
        <div className="position-relative">
          <img
            src={avatar}
            alt="avatar"
            className="rounded-4 mb-3"
            style={{ width: "200px" }}
          />
          <span
            className="position-absolute bottom-0 end-0 translate-middle p-2 bg-success border border-light rounded-circle"
            style={{ width: "13px", height: "13px" }}
          ></span>
        </div>
        <h5 className="mb-1">Ansh Shinde</h5>
        <span className="badge bg-secondary mb-3">Web Developer</span>
      </div>

      <hr className="border-secondary" />

      <div className="text-white-50 small">
        <div className="d-flex align-items-center mb-3">
          <div className="bg-secondary bg-opacity-25 p-2 rounded me-3">
            <FaEnvelope className="text-warning" />
          </div>
          <div>
            <div className="text-uppercase small">Email</div>
            <div className="text-white">
              <a href="mailto:anshshinde449@gmail.com" className="text-white text-decoration-none">
                anshshinde449@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center mb-3">
          <div className="bg-secondary bg-opacity-25 p-2 rounded me-3">
            <FaPhone className="text-warning" />
          </div>
          <div>
            <div className="text-uppercase small">Phone</div>
            <div className="text-white">+91 9137998751</div>
          </div>
        </div>

        <div className="d-flex align-items-center mb-4">
          <div className="bg-secondary bg-opacity-25 p-2 rounded me-3">
            <FaMapMarkerAlt className="text-warning" />
          </div>
          <div>
            <div className="text-uppercase small">Location</div>
            <div className="text-white">Bhayandar, Mumbai</div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-around">
        <a href="https://www.linkedin.com/in/ansh-shinde-73137b282/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-white fs-5" />
        </a>
        <a href="https://github.com/AnshShinde2007" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-white fs-5" />
        </a>
        <a href="https://x.com/AnshShinde14" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-white fs-5" />
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
