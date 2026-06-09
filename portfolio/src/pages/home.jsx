// src/pages/home.jsx
/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import {
  FaServer,
  FaCode,
  FaBrain,
  FaDocker,
  FaReact,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFileAlt,
  FaTwitter,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

/* ── Animation Variants ──────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const viewportOpts = { once: true, margin: "-80px" };

/* ══════════════════════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════════════════════ */
const HeroSection = () => (
  <section className="hero" id="hero" aria-label="Hero">
    {/* Ambient background elements */}
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* Floating code snippets */}
      {[
        { text: "const deploy = async () => {\n  await ship();\n};", top: "12%", left: "62%", opacity: 0.045 },
        { text: "> git push origin main\nremote: deployed ✓", top: "70%", left: "68%", opacity: 0.035 },
        { text: "SELECT * FROM users\nWHERE active = true;", top: "55%", left: "54%", opacity: 0.04 },
      ].map((snippet, i) => (
        <div key={i} style={{
          position: "absolute",
          top: snippet.top,
          left: snippet.left,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.72rem",
          color: "rgba(96,165,250,1)",
          opacity: snippet.opacity,
          whiteSpace: "pre",
          lineHeight: 1.7,
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "0.02em",
        }}>{snippet.text}</div>
      ))}
    </div>

    <div className="container">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <div className="hero-available-badge">
            <span className="hero-available-dot" />
            > Available for opportunities
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 className="hero-headline" variants={fadeUp}>
          Hi, I&apos;m <span>Ansh</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p className="hero-sub" variants={fadeUp}>
          I build scalable software, AI products<br />
          and developer tools.
        </motion.p>

        {/* Description */}
        <motion.p className="hero-desc" variants={fadeUp}>
          Computer Science student from Mumbai focused on backend engineering,
          distributed systems and modern web applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className="hero-btns" variants={fadeUp}>
          <button
            id="hero-view-projects"
            className="btn-primary"
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Projects →
          </button>
          <button
            id="hero-contact"
            className="btn-outline"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contact Me
          </button>
        </motion.div>
      </motion.div>
    </div>

    {/* Scroll hint */}
    <div className="hero-scroll-hint" aria-hidden="true">
      scroll
      <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
        <path
          d="M6 1v16M1 12l5 5 5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </section>
);

/* ══════════════════════════════════════════════════════════
   ABOUT SECTION
══════════════════════════════════════════════════════════ */
const timeline = [
  {
    year: "2021",
    label: "First line of code",
    desc: "Started with HTML & CSS. Fell down the rabbit hole immediately.",
  },
  {
    year: "2022",
    label: "Hackathon circuit",
    desc: "Competed in 3+ hackathons. Shipped real products under 48-hour pressure.",
  },
  {
    year: "2023",
    label: "Backend deep-dive",
    desc: "Studied distributed systems, PostgreSQL, Redis, and API design at scale.",
  },
  {
    year: "2024",
    label: "AI & LLM integration",
    desc: "Built RAG pipelines, vector search apps, and OpenAI-powered developer tools.",
  },
  {
    year: "2025 →",
    label: "World-class engineer",
    desc: "Chasing engineering excellence. Long-term goal: software engineer in Japan.",
  },
];

const AboutSection = () => (
  <section className="section" id="about" aria-label="About">
    <div className="container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        variants={stagger}
      >
        <motion.span className="section-label" variants={fadeUp}>About</motion.span>
        <motion.h2 className="section-title" variants={fadeUp}>
          Building with{" "}
          <span style={{ background: "var(--grad-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>purpose</span>
        </motion.h2>

        <div className="about-grid">
          {/* Bio */}
          <motion.div className="about-bio" variants={fadeUp}>
            <p>
              I&apos;m <strong>Ansh Shinde</strong>, a Computer Science student from Mumbai
              obsessed with building things that actually work. Not side projects that
              never launch — real products that solve real problems.
            </p>
            <p style={{ marginTop: "16px" }}>
              My core focus is <strong>backend engineering</strong> — designing systems
              that scale, APIs that don&apos;t break, and infrastructure that stays up.
              I&apos;m equally drawn to <strong>AI products</strong>: RAG pipelines,
              vector databases, and LLM-powered developer tools.
            </p>
            <p style={{ marginTop: "16px" }}>
              I&apos;ve already started thinking like a software engineer. This portfolio
              is evidence of that, not a placeholder for potential.
            </p>
            <div className="about-tags">
              {["Backend Systems", "AI Products", "Developer Tools", "Open Source", "Distributed Systems"].map((t) => (
                <span key={t} className="about-tag">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={fadeUp}>
            <div className="timeline">
              {timeline.map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-label">{item.label}</div>
                  <div className="timeline-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════════════════
   SKILLS SECTION
══════════════════════════════════════════════════════════ */
const skillDomains = [
  {
    icon: FaServer,
    name: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "Redis", "MongoDB", "REST APIs", "Auth / JWT", "WebSockets"],
  },
  {
    icon: FaReact,
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "HTML5", "CSS3"],
  },
  {
    icon: FaBrain,
    name: "AI / ML",
    skills: ["OpenAI APIs", "RAG", "Vector DBs", "AI Agents", "LangChain", "Embeddings", "Prompt Eng."],
  },
  {
    icon: FaDocker,
    name: "DevOps",
    skills: ["Docker", "AWS", "Linux", "CI/CD", "Git", "Nginx", "PM2"],
  },
];

const SkillsSection = () => (
  <section className="section" id="skills" aria-label="Skills">
    <div className="container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        variants={stagger}
      >
        <motion.span className="section-label" variants={fadeUp}>Stack</motion.span>
        <motion.h2 className="section-title" variants={fadeUp}>
          Tools I{" "}
          <span style={{ background: "var(--grad-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>work with</span>
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp}>
          Grouped by domain. Core focus on backend and AI, comfortable across the
          full stack.
        </motion.p>

        <div className="skills-grid">
          {skillDomains.map((domain, i) => (
            <motion.div key={i} className="skill-domain-card" variants={fadeUp}>
              <div className="skill-domain-header">
                <div className="skill-domain-icon">
                  <domain.icon />
                </div>
                <span className="skill-domain-name">{domain.name}</span>
              </div>
              <div className="skill-pills">
                {domain.skills.map((s) => (
                  <span key={s} className="skill-pill">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════════════════
   PROJECTS SECTION
══════════════════════════════════════════════════════════ */
const projects = [
  {
    name: "Job Recommendation Platform",
    desc: "AI-powered job matching engine with resume analysis, skill gap detection, and a personalised recommendation pipeline. Long-term project — built for real-world recruitment automation.",
    tech: ["OpenAI", "RAG", "Node.js", "PostgreSQL", "React", "Vector DB"],
    featured: true,
    emoji: "🎯",
    visual: `> Analyzing resume...
> Extracting skills:
  [Node.js, React, PostgreSQL, Docker]
> Running semantic match...
> Candidates found: 847
> Top match score:  0.94
> Role: Backend Engineer @ ...
> Sending recommendation...
✓ done in 312ms`,
  },
  {
    name: "GitHub Repo Assistant",
    desc: "AI tool that understands your entire codebase. Ask questions, generate docs, and search across any repository using RAG and vector search.",
    tech: ["OpenAI", "React", "Node.js", "Vector Search", "GitHub API"],
    emoji: "🤖",
    visual: `> repo: AnshShinde2007/project
> indexing 142 files... done

User: "How does auth work?"

AI: JWT tokens validated in
    middleware/auth.js:23
    using RS256 + refresh cycle

> context: 3 files referenced`,
  },
  {
    name: "URL Shortener",
    desc: "System design showcase. High-performance URL shortener with Redis caching, rate limiting, real-time click analytics, and scalable architecture.",
    tech: ["Node.js", "Redis", "PostgreSQL", "Rate Limiting", "Analytics"],
    emoji: "⚡",
    visual: `> POST /api/shorten
  url: "https://very-long..."
  ✓ cached in Redis   (2ms)
  ✓ rate limit:   98/100

> Analytics dashboard
  clicks today:   1,247
  unique users:     891
  cache hit rate:  94%
  p99 latency:     8ms`,
  },
];

const ProjectsSection = () => (
  <section className="section" id="projects" aria-label="Projects">
    <div className="container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        variants={stagger}
      >
        <motion.span className="section-label" variants={fadeUp}>Work</motion.span>
        <motion.h2 className="section-title" variants={fadeUp}>
          Featured{" "}
          <span style={{ background: "var(--grad-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>projects</span>
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp}>
          Products built with real engineering depth. Not tutorials, not templates.
        </motion.p>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              className={`project-card-new${p.featured ? " featured" : ""}`}
              variants={fadeUp}
            >
              <div className="project-visual">
                <div className="project-visual-bg">{p.visual}</div>
                <div className="project-visual-icon">{p.emoji}</div>
                <div className="project-hover-overlay">↗ View Project</div>
              </div>
              <div className="project-body">
                {p.featured && (
                  <div className="project-featured-badge">★ Centerpiece</div>
                )}
                <div className="project-name">{p.name}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-tech-tags">
                  {p.tech.map((t) => (
                    <span key={t} className="project-tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════════════════
   EXPERIENCE SECTION
══════════════════════════════════════════════════════════ */
const experiences = [
  {
    year: "2025 – Present",
    title: "Flutter Developer",
    org: "Soul Yatri",
    desc: "Building the frontend of a mental wellness application. Integrating empathy voice APIs, implementing real-time data features, and collaborating with designers on user-first interactions.",
    metric: "Production app · 0 → launch",
  },
  {
    year: "2024",
    title: "Hackathon Engineer",
    org: "3+ Competitions",
    desc: "Shipped production-ready applications under 24–48 hour constraints. Focused on rapid backend prototyping, clean architecture, and demos that actually worked.",
    metric: "3 hackathons · shipped every time",
  },
  {
    year: "2023 – Present",
    title: "Open Source Contributor",
    org: "GitHub · @AnshShinde2007",
    desc: "Actively building and contributing to developer tooling. Published repositories covering backend templates, AI integration patterns, and system-design demonstrations.",
    metric: "Public repos · active contributor",
  },
];

const ExperienceSection = () => (
  <section className="section" id="experience" aria-label="Experience">
    <div className="container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        variants={stagger}
      >
        <motion.span className="section-label" variants={fadeUp}>Experience</motion.span>
        <motion.h2 className="section-title" variants={fadeUp}>
          What I've{" "}
          <span style={{ background: "var(--grad-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>shipped</span>
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp}>
          Show execution, not motivation. Every card has a measurable outcome.
        </motion.p>

        <div className="experience-grid">
          {experiences.map((exp, i) => (
            <motion.div key={i} className="exp-card" variants={fadeUp}>
              <div className="exp-card-year">{exp.year}</div>
              <div className="exp-card-title">{exp.title}</div>
              <div className="exp-card-org">{exp.org}</div>
              <div className="exp-card-desc">{exp.desc}</div>
              <div className="exp-metric">{exp.metric}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════════════════
   DEVELOPER DASHBOARD SECTION
══════════════════════════════════════════════════════════ */
const stats = [
  { label: "Years Coding",    value: "4+",   unit: "years" },
  { label: "Projects Built",  value: "12+",  unit: "shipped" },
  { label: "Hackathons",      value: "3+",   unit: "competed" },
  { label: "GitHub Commits",  value: "500+", unit: "commits" },
];

const DashboardSection = () => (
  <section className="section" id="dashboard" aria-label="Developer Dashboard">
    <div className="container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        variants={stagger}
      >
        <motion.span className="section-label" variants={fadeUp}>Stats</motion.span>
        <motion.h2 className="section-title" variants={fadeUp}>
          Developer{" "}
          <span style={{ background: "var(--grad-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>dashboard</span>
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp}>
          Live numbers. No made-up metrics.
        </motion.p>

        <motion.div className="dashboard-panel" variants={fadeUp}>
          {/* macOS-style title bar */}
          <div className="dashboard-titlebar">
            <div className="dashboard-dot red" />
            <div className="dashboard-dot yellow" />
            <div className="dashboard-dot green" />
            <span className="dashboard-titlebar-label">ansh@portfolio ~ stats --live</span>
          </div>

          {/* Stats grid */}
          <div className="dashboard-body">
            {stats.map((s, i) => (
              <div key={i} className="dashboard-stat">
                <div className="dashboard-stat-label">{s.label}</div>
                <div className="dashboard-stat-value">{s.value}</div>
                <div className="dashboard-stat-unit">{s.unit}</div>
              </div>
            ))}
          </div>

          {/* Focus row with blinking cursor */}
          <div className="dashboard-focus-row">
            <span className="dashboard-prompt">$</span>
            <span>
              current_focus:{" "}
              <span style={{ color: "var(--primary-light)" }}>
                Backend Engineering
              </span>
            </span>
            <span className="dashboard-cursor" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════════════════
   CONTACT SECTION
══════════════════════════════════════════════════════════ */
const contactLinks = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "anshshinde449@gmail.com",
    href: "mailto:anshshinde449@gmail.com",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "github.com/AnshShinde2007",
    href: "https://github.com/AnshShinde2007",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/ansh-shinde",
    href: "https://www.linkedin.com/in/ansh-shinde-73137b282/",
  },
  {
    icon: FaFileAlt,
    label: "Resume",
    value: "Download PDF →",
    href: "https://drive.google.com/drive/folders/1JQvdOWH_iCYrH_I-lxFqH-98IfiU3Q7s?usp=sharing",
  },
];

const ContactSection = () => {
  const form = useRef(null);
  const [sending, setSending] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    if (!form.current) return;
    setSending(true);

    const data = {
      username: form.current.username?.value || "",
      email:    form.current.email?.value    || "",
      subject:  form.current.subject?.value  || "",
      fullmsg:  form.current.fullmsg?.value  || "",
    };

    try {
      const response = await fetch("http://localhost:3000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Status ${response.status}`);
      await response.json().catch(() => ({}));
      toast.success("Message sent!");
      form.current.reset();
    } catch (err) {
      console.error("Send error:", err);
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section" id="contact" aria-label="Contact">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOpts}
          variants={stagger}
        >
          <motion.span className="section-label" variants={fadeUp}>Contact</motion.span>
          <motion.h2 className="contact-cta" variants={fadeUp}>
            Let&apos;s build something <span>interesting.</span>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp}>
            Open for full-time roles, internships, and collaboration on meaningful
            projects. Based in Mumbai — open to remote and relocation.
          </motion.p>

          <div className="contact-grid">
            {/* Links */}
            <motion.div className="contact-links" variants={fadeUp}>
              {contactLinks.map((link, i) => (
                <a
                  key={i}
                  id={`contact-link-${link.label.toLowerCase()}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-row"
                >
                  <div className="contact-link-icon">
                    <link.icon />
                  </div>
                  <div>
                    <span className="contact-link-label">{link.label}</span>
                    <span className="contact-link-value">{link.value}</span>
                  </div>
                </a>
              ))}
            </motion.div>

            {/* Form */}
            <motion.form
              ref={form}
              onSubmit={send}
              className="contact-form-wrap"
              variants={fadeUp}
            >
              <div className="form-row">
                <input
                  type="text"
                  name="username"
                  placeholder="Full name"
                  className="form-field-new"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="form-field-new"
                  required
                />
              </div>
              <input
                name="subject"
                placeholder="Subject"
                className="form-field-new"
                required
              />
              <textarea
                name="fullmsg"
                placeholder="Your message…"
                rows="5"
                className="form-field-new"
                required
              />
              <input type="hidden" name="time" value={new Date().toLocaleString()} />
              <button
                id="contact-send-btn"
                type="submit"
                className="send-btn-new"
                disabled={sending}
              >
                {sending ? "Sending…" : "✉ Send Message"}
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════
   HOME (root page — assembles all sections)
══════════════════════════════════════════════════════════ */
const Home = () => (
  <>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "var(--surface)",
          color:      "var(--text-primary)",
          border:     "1px solid var(--border)",
          fontFamily: "var(--font-body)",
          fontSize:   "0.87rem",
        },
      }}
    />

    <Navbar />

    <main>
      <HeroSection />

      <hr className="section-divider" />
      <AboutSection />

      <hr className="section-divider" />
      <SkillsSection />

      <hr className="section-divider" />
      <ProjectsSection />

      <hr className="section-divider" />
      <ExperienceSection />

      <hr className="section-divider" />
      <DashboardSection />

      <hr className="section-divider" />
      <ContactSection />
    </main>

    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          Designed &amp; built by <span>Ansh Shinde</span> ·
          React + Vite · Deployed on Vercel
        </p>
      </div>
    </footer>
  </>
);

export default Home;
