import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import About from "./pages/about";
import Resume from "./pages/resume";
import Portfolio from "./pages/portfolio";
import Contact from "./pages/contact";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css'; // <-- Important

function App() {
  return (
    <Router>
      <div className="d-flex bg-black min-vh-100 text-white gap-3 px-3 py-4">
        <Sidebar />
        <main className="flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
