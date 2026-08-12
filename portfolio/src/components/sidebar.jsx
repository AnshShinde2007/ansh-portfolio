// src/components/sidebar.jsx
// Floating pill dock — replaces the old profile card sidebar.
// Uses only react-icons (already installed) and inline styles / CSS vars.
// Drop <ProfileCard /> anywhere; it renders as a fixed bottom-center dock.

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaFileAlt,
} from "react-icons/fa";

/* ── Nav items ─────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "home",       label: "Home",      icon: FaHome,      href: "/",          type: "link" },
  { id: "about",      label: "About",     icon: FaUser,      href: "#about",     type: "scroll" },
  { id: "projects",   label: "Projects",  icon: FaCode,      href: "#projects",  type: "scroll" },
  { id: "experience", label: "Experience",icon: FaBriefcase, href: "#experience",type: "scroll" },
  { id: "contact",    label: "Contact",   icon: FaEnvelope,  href: "#contact",   type: "scroll" },
];

const SOCIAL_ITEMS = [
  {
    id: "github",
    label: "GitHub",
    icon: FaGithub,
    href: "https://github.com/AnshShinde2007",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/ansh-shinde-73137b282/",
  },
  {
    id: "twitter",
    label: "X / Twitter",
    icon: FaTwitter,
    href: "https://x.com/AnshShinde14",
  },
  {
    id: "resume",
    label: "Resume",
    icon: FaFileAlt,
    href: "https://drive.google.com/drive/folders/1JQvdOWH_iCYrH_I-lxFqH-98IfiU3Q7s?usp=sharing",
  },
  {
    id: "mail",
    label: "Mail",
    icon: FaEnvelope,
    href: "mailto:anshshinde449@gmail.com",
  },
];

/* ── DockButton ─────────────────────────────────────────────────────────────── */
function DockButton({ label, icon: Icon, onClick, isActive, href, external }) {
  const [hovered, setHovered] = useState(false);

  const btnStyle = {
    position: "relative",
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    cursor: "pointer",
    color: isActive
      ? "rgba(255,255,255,0.95)"
      : hovered
      ? "rgba(255,255,255,0.88)"
      : "rgba(255,255,255,0.42)",
    background: isActive
      ? "rgba(255,255,255,0.10)"
      : hovered
      ? "rgba(255,255,255,0.07)"
      : "transparent",
    border: "none",
    transition: "color 0.18s ease, background 0.18s ease",
    flexShrink: 0,
    textDecoration: "none",
    outline: "none",
  };

  // Active indicator dot
  const dotStyle = {
    position: "absolute",
    bottom: -3,
    left: "50%",
    transform: "translateX(-50%)",
    width: 3,
    height: 3,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.62)",
    opacity: isActive ? 1 : 0,
    transition: "opacity 0.18s ease",
  };

  // Tooltip
  const tooltipStyle = {
    pointerEvents: "none",
    position: "absolute",
    bottom: "calc(100% + 10px)",
    left: "50%",
    transform: hovered ? "translateX(-50%) translateY(-2px)" : "translateX(-50%) translateY(0px)",
    background: "rgba(10,10,10,0.96)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
    padding: "4px 10px",
    fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)",
    fontSize: 9,
    letterSpacing: "0.06em",
    whiteSpace: "nowrap",
    color: "rgba(255,255,255,0.65)",
    opacity: hovered ? 1 : 0,
    transition: "opacity 0.14s ease, transform 0.14s ease",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    zIndex: 10001,
  };

  const Tag = external ? "a" : onClick ? "button" : "span";
  const extraProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : onClick
    ? { onClick, type: "button" }
    : {};

  return (
    <Tag
      aria-label={label}
      style={btnStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...extraProps}
    >
      {/* Inner highlight ring for active */}
      <span
        style={{
          position: "absolute",
          inset: 4,
          borderRadius: 10,
          background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
          ring: isActive ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "background 0.18s ease",
        }}
      />
      <Icon size={16} style={{ position: "relative", zIndex: 1 }} />
      <span style={dotStyle} />
      <span style={tooltipStyle}>{label}</span>
    </Tag>
  );
}

/* ── Separator ───────────────────────────────────────────────────────────────── */
function Separator() {
  return (
    <div
      style={{
        width: 1,
        height: 24,
        background: "rgba(255,255,255,0.09)",
        flexShrink: 0,
        margin: "0 4px",
        alignSelf: "center",
      }}
    />
  );
}

/* ── ProfileCard (Floating Dock) ─────────────────────────────────────────────── */
const ProfileCard = () => {
  const location = useLocation();

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const dockStyle = {
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9000,
    display: "flex",
    alignItems: "center",
    gap: 2,
    padding: "6px 10px",
    borderRadius: 21,
    background: "rgba(11,11,11,0.92)",
    backdropFilter: "blur(22px) saturate(1.7)",
    WebkitBackdropFilter: "blur(22px) saturate(1.7)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)",
    transition: "box-shadow 0.24s ease",
  };

  return (
    <div style={dockStyle} role="navigation" aria-label="Site navigation dock">

      {/* Nav section */}
      {NAV_ITEMS.map((item) => {
        const isActive = item.type === "link" && location.pathname === item.href;
        return item.type === "link" ? (
          <Link key={item.id} to={item.href} style={{ textDecoration: "none" }}>
            <DockButton
              label={item.label}
              icon={item.icon}
              isActive={isActive}
            />
          </Link>
        ) : (
          <DockButton
            key={item.id}
            label={item.label}
            icon={item.icon}
            isActive={false}
            onClick={() => scrollTo(item.href)}
          />
        );
      })}

      <Separator />

      {/* Social / external section */}
      {SOCIAL_ITEMS.map((item) => (
        <DockButton
          key={item.id}
          label={item.label}
          icon={item.icon}
          href={item.href}
          external
          isActive={false}
        />
      ))}
    </div>
  );
};

export default ProfileCard;
