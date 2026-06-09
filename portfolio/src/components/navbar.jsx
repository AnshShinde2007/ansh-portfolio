// src/components/navbar.jsx
import React, { useState, useEffect } from "react";

const navLinks = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        {/* Logo */}
        <div className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="navbar-logo-mark">AS</span>
          ansh.dev
        </div>

        {/* Desktop nav links */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <span className="navbar-link" onClick={() => scrollTo(link.href)}>
                {link.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <a
            href="https://drive.google.com/drive/folders/1JQvdOWH_iCYrH_I-lxFqH-98IfiU3Q7s?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-resume-btn"
          >
            Resume ↓
          </a>
          <button
            id="navbar-hamburger"
            className={`navbar-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} role="navigation">
        {navLinks.map((link) => (
          <span
            key={link.href}
            className="mobile-menu-link"
            onClick={() => scrollTo(link.href)}
          >
            {link.label}
          </span>
        ))}
        <a
          href="https://drive.google.com/drive/folders/1JQvdOWH_iCYrH_I-lxFqH-98IfiU3Q7s?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-menu-link"
          style={{ color: "var(--primary-light)" }}
        >
          ↓ Download Resume
        </a>
      </div>
    </>
  );
};

export default Navbar;
