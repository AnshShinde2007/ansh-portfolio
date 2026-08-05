// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home          from "./pages/home";
import AdminLogin    from "./pages/adminlogin";
import Admin         from "./pages/admin";
import ProtectedRoute from "./components/protectedroute";
import "./App.css";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
