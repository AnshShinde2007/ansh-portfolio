import React from "react";
import { useLocation } from "react-router-dom";

const navLinks = [
  { href: "/", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

const Layout = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      className="bg-secondary bg-opacity-10 rounded-4 p-4 mt-3 mx-auto"
      style={{ maxWidth: "1000px" }}
    >
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center border-bottom border-secondary pb-3 mb-4 gap-2">
        <div>
          <h2 className="text-white mb-0">
            {currentPath === "/"
              ? "About Me"
              : currentPath.replace("/", "").charAt(0).toUpperCase() +
                currentPath.slice(2)}
          </h2>
          <div
            className="bg-warning"
            style={{ height: "4px", width: "50px", marginTop: "5px" }}
          ></div>
        </div>

        {/* Navigation: only shown on md and above */}
        <nav className="d-none d-md-flex gap-3 flex-wrap">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-decoration-none fw-semibold ${
                currentPath === link.href ? "text-warning" : "text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
};

export default Layout;
