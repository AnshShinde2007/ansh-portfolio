import React from "react";
import { useLocation, Link } from "react-router-dom";

const navLinks = [
  { href: "/", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

const Layout = ({ children, title }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const pageTitle = title
    ? title
    : currentPath === "/"
    ? "About Me"
    : currentPath.replace("/", "").charAt(0).toUpperCase() + currentPath.slice(2);

  return (
    <div className="page-card">
      {/* Header */}
      <div className="page-header">
        <div className="page-title-wrap">
          <h2>{pageTitle}</h2>
          <div className="page-title-bar" />
        </div>

        {/* Desktop Navigation */}
        <nav className="page-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link-item${currentPath === link.href ? " active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
};

export default Layout;
