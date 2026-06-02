import React, { useState } from "react";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/admin", {   // FIXED PORT
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("admin", "true");
        localStorage.setItem("admin-pass", password);
        toast.success("Logged in");
        window.location.href = "/admin";
      } else {
        toast.error("Wrong password");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="text-center mt-5">
      <h2 className="text-white mb-4">Admin Login</h2>

      <form onSubmit={handleLogin} className="d-flex flex-column align-items-center gap-3">
        <input
          type="password"
          placeholder="Enter Password"
          className="form-control bg-dark text-white border-0"
          style={{ width: "300px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-warning fw-bold px-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
