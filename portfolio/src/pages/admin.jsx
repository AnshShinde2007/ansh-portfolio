import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/layout";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState({
    aboutMe: "",
    email: "",
    experiences: [],
    projects: [],
    skills: [],
  });

  const logos = ["js", "react", "node", "express", "mongo"];

  useEffect(() => {
    fetch("http://localhost:5000/portfolio")
      .then((res) => res.json())
      .then(setData)
      .catch(() => toast.error("Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  const saveChanges = async () => {
    setSaving(true);
    const pass = localStorage.getItem("admin-pass");
    if (!pass) return toast.error("Not logged in as admin");

    try {
      const res = await fetch("http://localhost:3000/portfolio", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "admin-pass": pass,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) return toast.error("Save failed");
      toast.success("Updated successfully");
    } catch {
      toast.error("Error occurred");
    }

    setSaving(false);
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--text-secondary)" }}>
        Loading…
      </div>
    );

  return (
    <Layout title="Admin Panel">
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

      {/* About Me */}
      <p className="admin-section-title">About Me</p>
      <textarea
        className="admin-field"
        rows="4"
        value={data.aboutMe}
        onChange={(e) => setData({ ...data, aboutMe: e.target.value })}
      />

      {/* Email */}
      <p className="admin-section-title" style={{ marginTop: "8px" }}>Email</p>
      <input
        type="email"
        className="admin-field"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      {/* Experiences */}
      <p className="admin-section-title" style={{ marginTop: "16px" }}>Experiences</p>
      {data.experiences.map((exp, i) => (
        <div key={i} className="admin-card">
          <input
            className="admin-field"
            placeholder="Role"
            value={exp.role}
            onChange={(e) => {
              const copy = [...data.experiences];
              copy[i].role = e.target.value;
              setData({ ...data, experiences: copy });
            }}
          />
          <input
            className="admin-field"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => {
              const copy = [...data.experiences];
              copy[i].company = e.target.value;
              setData({ ...data, experiences: copy });
            }}
          />
          <input
            className="admin-field"
            placeholder="Duration"
            value={exp.duration}
            onChange={(e) => {
              const copy = [...data.experiences];
              copy[i].duration = e.target.value;
              setData({ ...data, experiences: copy });
            }}
          />
          <textarea
            className="admin-field"
            placeholder="Description"
            rows="3"
            value={exp.description}
            onChange={(e) => {
              const copy = [...data.experiences];
              copy[i].description = e.target.value;
              setData({ ...data, experiences: copy });
            }}
          />
        </div>
      ))}
      <button
        className="admin-btn"
        onClick={() =>
          setData({
            ...data,
            experiences: [
              ...data.experiences,
              { role: "", company: "", duration: "", description: "" },
            ],
          })
        }
      >
        + Add Experience
      </button>

      {/* Skills */}
      <p className="admin-section-title">Skills</p>
      {data.skills.map((skill, i) => (
        <div key={i} className="admin-card">
          <input
            className="admin-field"
            placeholder="Skill name"
            value={skill.name}
            onChange={(e) => {
              const copy = [...data.skills];
              copy[i].name = e.target.value;
              setData({ ...data, skills: copy });
            }}
          />
          <select
            className="admin-field"
            value={skill.logo}
            onChange={(e) => {
              const copy = [...data.skills];
              copy[i].logo = e.target.value;
              setData({ ...data, skills: copy });
            }}
            style={{ appearance: "auto" }}
          >
            <option value="">Select logo</option>
            {logos.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <textarea
            className="admin-field"
            placeholder="Description"
            rows="2"
            value={skill.desc}
            onChange={(e) => {
              const copy = [...data.skills];
              copy[i].desc = e.target.value;
              setData({ ...data, skills: copy });
            }}
          />
        </div>
      ))}
      <button
        className="admin-btn"
        onClick={() =>
          setData({
            ...data,
            skills: [...data.skills, { name: "", logo: "", desc: "" }],
          })
        }
      >
        + Add Skill
      </button>

      {/* Projects */}
      <p className="admin-section-title">Projects</p>
      {data.projects.map((proj, i) => (
        <div key={i} className="admin-card">
          <input
            className="admin-field"
            placeholder="Title"
            value={proj.title}
            onChange={(e) => {
              const copy = [...data.projects];
              copy[i].title = e.target.value;
              setData({ ...data, projects: copy });
            }}
          />
          <input
            className="admin-field"
            placeholder="Link"
            value={proj.link}
            onChange={(e) => {
              const copy = [...data.projects];
              copy[i].link = e.target.value;
              setData({ ...data, projects: copy });
            }}
          />
          <textarea
            className="admin-field"
            placeholder="Description"
            rows="3"
            value={proj.description}
            onChange={(e) => {
              const copy = [...data.projects];
              copy[i].description = e.target.value;
              setData({ ...data, projects: copy });
            }}
          />
        </div>
      ))}
      <button
        className="admin-btn"
        onClick={() =>
          setData({
            ...data,
            projects: [...data.projects, { title: "", link: "", description: "" }],
          })
        }
      >
        + Add Project
      </button>

      {/* Save */}
      <div style={{ textAlign: "center", marginTop: "32px" }}>
        <button className="save-btn" disabled={saving} onClick={saveChanges}>
          {saving ? "Saving…" : "✓ Save Changes"}
        </button>
      </div>
    </Layout>
  );
};

export default Admin;
