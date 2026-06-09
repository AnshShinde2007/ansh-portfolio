// src/components/layout.jsx
// Used by the admin dashboard page (admin.jsx).
// Provides a centred content wrapper with top padding for the sticky navbar.
import React from "react";

const Layout = ({ children }) => (
  <div className="admin-layout-wrap">
    {children}
  </div>
);

export default Layout;
