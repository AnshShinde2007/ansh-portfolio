// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Home          from "./pages/home";
import AdminLogin    from "./pages/adminlogin";
import Admin         from "./pages/admin";
import ProtectedRoute from "./components/protectedroute";
import Oneko         from "./components/Oneko";
import "./App.css";

function App() {
  return (
    <Router>
      {/* Cursor pet — mounts once at root, auto-skips touch devices & reduced-motion */}
      <Oneko />
      <Routes>
        {/* Main portfolio */}
        <Route path="/" element={<Home />} />

        {/* Admin — preserved, untouched */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
