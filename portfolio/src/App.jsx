// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Terminal    from "./terminal/Terminal";
import Admin       from "./pages/adminlogin";   // admin dashboard (protected)
import AdminLogin  from "./pages/admin";         // login page
import ProtectedRoute from "./components/protectedroute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main single-page portfolio */}
        <Route path="/" element={<Terminal />} />

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
    </Router>
  );
}

export default App;
