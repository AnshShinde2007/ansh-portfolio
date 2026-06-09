import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AdminLogin = () => {
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
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
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--bg-card)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            fontFamily: "var(--font-body)",
          },
        }}
      />

      <div
        style={{
          background: "var(--bg-glass)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "48px 40px",
          width: "100%",
          maxWidth: "380px",
          boxShadow: "var(--shadow-card)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-head)",
            fontWeight: 700,
            fontSize: "1.4rem",
            background: "var(--grad-accent)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "8px",
          }}
        >
          Admin Login
        </h2>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "28px" }}>
          Authorized access only
        </p>

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <input
            type="password"
            placeholder="Enter password"
            className="form-field"
            style={{ textAlign: "center", letterSpacing: "0.15em" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="send-btn" style={{ width: "100%", justifyContent: "center" }}>
            → Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
