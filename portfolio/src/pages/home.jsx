// src/pages/home.jsx
/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState } from "react";
import {
  FaGithub, FaLinkedin, FaEnvelope, FaFileAlt,
  FaHome, FaMapMarkerAlt, FaExternalLinkAlt,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

/* ──────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: "agentpulse",
    title: "AgentPulse",
    subtitle: "AI Observability Platform",
    year: "2025",
    tags: ["FastAPI", "OpenTelemetry", "Next.js"],
    tagExtra: 2,
    github: "https://github.com/AnshShinde2007/AgentPulse",
    preview: `> POST /v1/traces
  span_id: a3f92c1
  agent: recommend-jobs
  tokens: 1,247
  latency: 312ms
  status: OK

> GET /dashboard
  spans: 142
  cost: $0.031
  p95: 420ms`,
  },
  {
    id: "job-recommender",
    title: "Job Recommender",
    subtitle: "Semantic Job Matching Engine",
    year: "2025",
    tags: ["Next.js", "Node.js", "pgvector"],
    tagExtra: 2,
    github: "https://github.com/AnshShinde2007",
    preview: `> Parsing resume...
> Skills extracted:
  [React, Node.js, PostgreSQL]
> Embedding vector...
> Similarity search:
  match_score: 0.94
  role: Backend Engineer
✓ done in 312ms`,
  },
  {
    id: "repo-assistant",
    title: "Repo Assistant",
    subtitle: "Codebase RAG Chat",
    year: "2024",
    tags: ["OpenAI", "React", "Node.js"],
    tagExtra: 2,
    github: "https://github.com/AnshShinde2007",
    preview: `> repo: AnshShinde2007/project
> indexing 142 files... done

Q: "How does auth work?"

A: JWT validated in
   middleware/auth.js:23
   RS256 + refresh cycle

> 3 files referenced`,
  },
  {
    id: "url-shortener",
    title: "URL Shortener",
    subtitle: "System Design Showcase",
    year: "2024",
    tags: ["Node.js", "Redis", "PostgreSQL"],
    tagExtra: 0,
    github: "https://github.com/AnshShinde2007",
    preview: `> POST /api/shorten
  ✓ cached in Redis   (2ms)
  ✓ rate limit: 98/100

> Analytics:
  clicks today: 1,247
  unique users:    891
  cache hit:       94%
  p99 latency:    8ms`,
  },
];

const EXPERIENCE = [
  {
    id: "soul-yatri",
    abbr: "SY",
    title: "Flutter Developer",
    org: "Soul Yatri",
    year: "'25 – now",
    desc: "Building the frontend of a mental wellness app from 0 to production. Integrated empathy voice APIs and real-time data features.",
    badge: "Production",
  },
  {
    id: "hackathons",
    abbr: "HK",
    title: "Hackathon Engineer",
    org: "3 Competitions",
    year: "2024",
    desc: "Shipped production-ready applications under 24–48 hour constraints. 1st place in the AI track.",
    badge: "1st Place",
  },
  {
    id: "oss",
    abbr: "OS",
    title: "Open Source Contributor",
    org: "GitHub · @AnshShinde2007",
    year: "'23 – now",
    desc: "Backend templates, AI integration patterns, and system-design demonstrations. Active contributor.",
    badge: null,
  },
];

const SKILLS = [
  {
    label: "Backend",
    items: ["Node.js", "Express", "FastAPI", "PostgreSQL", "Redis", "MongoDB", "REST APIs", "JWT Auth"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Flutter", "Tailwind CSS", "Vite"],
  },
  {
    label: "AI / ML",
    items: ["OpenAI APIs", "RAG", "pgvector", "AI Agents", "LangChain", "OpenTelemetry", "OTLP"],
  },
  {
    label: "DevOps",
    items: ["Docker", "AWS", "Linux", "Git", "CI/CD", "Nginx"],
  },
];

const STATS = [
  { value: "4+", label: "Years" },
  { value: "5", label: "Projects" },
  { value: "3", label: "Hackathons" },
  { value: "500+", label: "Commits" },
];

const CONTACT_LINKS = [
  {
    id: "email",
    icon: FaEnvelope,
    label: "Email",
    value: "anshshinde449@gmail.com",
    href: "mailto:anshshinde449@gmail.com",
    ariaLabel: "Send email to Ansh Shinde",
  },
  {
    id: "github",
    icon: FaGithub,
    label: "GitHub",
    value: "AnshShinde2007",
    href: "https://github.com/AnshShinde2007",
    ariaLabel: "Ansh Shinde on GitHub (opens in new tab)",
  },
  {
    id: "linkedin",
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "ansh-shinde-73137b282",
    href: "https://www.linkedin.com/in/ansh-shinde-73137b282/",
    ariaLabel: "Ansh Shinde on LinkedIn (opens in new tab)",
  },
  {
    id: "resume",
    icon: FaFileAlt,
    label: "Resume",
    value: "Download PDF →",
    href: "https://drive.google.com/file/d/1yt-FljGp_P6nR2-O1JwYqV1Xdfw_OrBx/view?usp=sharing",
    ariaLabel: "Download Ansh Shinde's resume PDF (opens in new tab)",
  },
];

/* ──────────────────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Introduction">
      {/* Decorative HUD — aria-hidden */}
      <div className="hero-hud" aria-hidden="true">
        <svg className="hero-hud-svg" viewBox="0 0 560 460" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="350" cy="200" r="180" stroke="white" strokeWidth="0.5" />
          <circle cx="350" cy="200" r="120" stroke="white" strokeWidth="0.5" />
          <circle cx="350" cy="200" r="60" stroke="white" strokeWidth="0.5" />
          <line x1="170" y1="200" x2="530" y2="200" stroke="white" strokeWidth="0.4" />
          <line x1="350" y1="20" x2="350" y2="380" stroke="white" strokeWidth="0.4" />
          <circle cx="350" cy="200" r="4" fill="white" />
          <text x="390" y="60" fill="white" fontSize="9" fontFamily="monospace">NET: +14.3</text>
          <text x="430" y="80" fill="white" fontSize="9" fontFamily="monospace">2026</text>
          <text x="200" y="320" fill="white" fontSize="8" fontFamily="monospace">SPECTRUM_ANALYSIS // E{"{1}"}</text>
          <text x="165" y="290" fill="white" fontSize="8" fontFamily="monospace">TRK-07</text>
          <text x="200" y="170" fill="white" fontSize="8" fontFamily="monospace">DS2</text>
          <rect x="185" y="300" width="160" height="60" rx="2" stroke="white" strokeWidth="0.4" />
          <text x="194" y="316" fill="white" fontSize="7" fontFamily="monospace">MEMORY_DUMP // SIG_07</text>
          <text x="194" y="328" fill="white" fontSize="7" fontFamily="monospace">0x00FF01 7A 9C F3 02 04 08</text>
          <text x="194" y="340" fill="white" fontSize="7" fontFamily="monospace">0x00FF0E 12 AF 00 7E C8 01</text>
          <text x="194" y="352" fill="white" fontSize="7" fontFamily="monospace">ALU_01</text>
        </svg>
      </div>

      <h1 className="hero-name">
        Ansh<br />Shinde<sup>io</sup>
      </h1>

      <p className="hero-role">Full Stack Developer &amp; AI Engineer</p>

      <div className="hero-meta">
        <div className="hero-meta-item hero-location">
          <FaMapMarkerAlt className="hero-location-icon" aria-hidden="true" />
          <span>INDIA</span>
        </div>
        <div className="hero-meta-item hero-status">
          <span className="hero-status-dot" aria-hidden="true" />
          <span>OPEN TO WORK</span>
        </div>
      </div>

      {/* Decorative code card */}
      <div className="hero-hud-card" aria-hidden="true">
        <div className="hero-hud-card-dot">
          <span /><span /><span />
        </div>
        {`> ssh ansh@portfolio\n`}
        {`  Connecting to Mumbai, India...\n`}
        {`  Authenticated. System ready.\n`}
        {`  Last commit: 2h ago\n`}
        {`  Status: Building AgentPulse v2`}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   ABOUT
   ────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" aria-label="About" className="about-section">
      <h2 className="section-heading">About</h2>

      <div>
        <h3 className="section-subheading">Background</h3>
        <p className="section-body">
          Final-year B.E. Computer Science student from Mumbai. Started with HTML and CSS,
          got immediately pulled into backend architecture. That habit of thinking through
          a system before writing any code has stuck, and I apply it to everything I build.
        </p>
        <p className="section-body">
          Long-term goal: Software Engineer in Japan. Current focus: ship software that
          holds up under real use, not just in demos.
        </p>
      </div>

      <div style={{ marginTop: "32px" }}>
        <h3 className="section-subheading">What I Build</h3>
        <p className="section-body">
          Backend side: REST APIs, auth systems, caching layers, PostgreSQL data models.
          I pay attention to the details most people skip — rate limiting, connection pooling,
          error handling that actually communicates what went wrong.
        </p>
        <p className="section-body">
          AI side: RAG pipelines, agent frameworks, observability tooling for LLM applications.
          I build things that are debuggable. If an agent fails at 2am, I want to know exactly
          which span, what cost, and why.
        </p>
      </div>

      {/* Stats row */}
      <div className="stats-row" aria-label="Statistics">
        {STATS.map(({ value, label }) => (
          <div key={label} className="stat-card">
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   SKILLS
   ────────────────────────────────────────────────────────── */
function Skills() {
  return (
    <section id="skills" aria-label="Skills">
      <h2 className="section-heading">Stack</h2>
      <div className="skills-grid">
        {SKILLS.map(({ label, items }) => (
          <div key={label} className="skill-category">
            <div className="skill-category-label">{label}</div>
            <ul className="skill-list" aria-label={`${label} skills`}>
              {items.map(item => (
                <li key={item} className="skill-pill">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   PROJECTS
   ────────────────────────────────────────────────────────── */
function Projects() {
  return (
    <section id="projects" aria-label="Projects">
      <h2 className="section-heading">Projects</h2>
      <div className="projects-grid">
        {PROJECTS.map(p => (
          <article key={p.id} className="project-card">
            {/* Code preview */}
            <div className="project-preview" aria-hidden="true">
              <div className="project-preview-bar">
                <span className="project-preview-dot" />
                <span className="project-preview-dot" />
                <span className="project-preview-dot" />
              </div>
              {p.preview}
              <div className="project-preview-fade" />
            </div>

            {/* Card body */}
            <div className="project-body">
              <div className="project-title">{p.title}</div>
              <div className="project-subtitle">{p.subtitle}</div>

              <div className="project-tags">
                {p.tags.map(t => (
                  <span key={t} className="project-tag">{t}</span>
                ))}
                {p.tagExtra > 0 && (
                  <span className="project-tag-more">+{p.tagExtra}</span>
                )}
                <span className="project-year" aria-label={`Year: ${p.year}`}>{p.year}</span>
              </div>

              <div className="project-actions">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-action-btn"
                  aria-label={`View ${p.title} on GitHub (opens in new tab)`}
                >
                  Details →
                </a>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-github-icon"
                  aria-label={`${p.title} GitHub repository (opens in new tab)`}
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   EXPERIENCE
   ────────────────────────────────────────────────────────── */
function Experience() {
  return (
    <section id="experience" aria-label="Experience">
      <h2 className="section-heading">Experience</h2>
      <div className="experience-list" role="list">
        {EXPERIENCE.map(exp => (
          <div key={exp.id} className="exp-item" role="listitem">
            <div className="exp-icon" aria-hidden="true">{exp.abbr}</div>
            <div className="exp-content">
              <div className="exp-title">{exp.title}</div>
              <div className="exp-org">{exp.org}</div>
              <p className="exp-desc">{exp.desc}</p>
            </div>
            <div className="exp-meta">
              <span className="exp-year">{exp.year}</span>
              {exp.badge && <span className="exp-badge">{exp.badge}</span>}
            </div>
            <span className="exp-expand-icon" aria-hidden="true">›</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   CONTACT
   ────────────────────────────────────────────────────────── */
function Contact() {
  const form = useRef(null);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");

  const send = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.current) return;
    setSending(true);

    const data = {
      username: form.current.username?.value || "",
      email:    form.current.email?.value    || "",
      subject:  form.current.subject?.value  || "",
      fullmsg:  form.current.fullmsg?.value  || "",
    };

    try {
      const res = await fetch("http://localhost:3000/submit", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      toast.success("Message sent!");
      form.current.reset();
    } catch (err) {
      console.error("Send error:", err);
      setFormError("Failed to send. Try emailing directly: anshshinde449@gmail.com");
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" aria-label="Contact">
      <h2 className="section-heading">Contact</h2>
      <p className="section-body" style={{ marginBottom: "24px" }}>
        Open for full-time engineering roles, backend/AI internships, and collaboration
        on interesting problems. Based in Mumbai — open to remote and relocation.
      </p>

      {/* Contact links */}
      <nav className="contact-links" aria-label="Contact links">
        {CONTACT_LINKS.map(link => (
          <a
            key={link.id}
            id={`contact-link-${link.id}`}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="contact-link-row"
            aria-label={link.ariaLabel}
          >
            <div className="contact-link-icon" aria-hidden="true">
              <link.icon />
            </div>
            <span className="contact-link-label">{link.label}</span>
            <span className="contact-link-value">{link.value}</span>
            <span className="contact-link-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>

      {/* Contact form */}
      <form
        ref={form}
        onSubmit={send}
        className="contact-form"
        aria-label="Send a message"
        noValidate
      >
        <div className="contact-form-header">Send a message</div>
        <div className="contact-form-body">
          {formError && (
            <div role="alert" style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xl)",
              color: "#ff6b6b",
              background: "rgba(255,107,107,0.08)",
              border: "1px solid rgba(255,107,107,0.2)",
              borderRadius: "var(--radius-sm)",
              padding: "10px 14px",
            }}>
              {formError}
            </div>
          )}

          <div className="contact-form-row">
            <div className="form-field-wrap">
              <label htmlFor="contact-name" className="form-field-label">Name</label>
              <input
                id="contact-name"
                name="username"
                type="text"
                className="form-input"
                placeholder="Your name"
                required
                autoComplete="name"
              />
            </div>
            <div className="form-field-wrap">
              <label htmlFor="contact-email" className="form-field-label">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-field-wrap">
            <label htmlFor="contact-subject" className="form-field-label">Subject</label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              className="form-input"
              placeholder="What's this about?"
              required
            />
          </div>

          <div className="form-field-wrap">
            <label htmlFor="contact-message" className="form-field-label">Message</label>
            <textarea
              id="contact-message"
              name="fullmsg"
              className="form-input"
              placeholder="Your message…"
              rows={5}
              required
            />
          </div>

          <button
            id="contact-send-btn"
            type="submit"
            className="form-submit-btn"
            disabled={sending}
            aria-busy={sending}
          >
            {sending ? "Sending…" : "Send Message"}
          </button>
        </div>
      </form>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   FLOATING DOCK NAVIGATION
   ────────────────────────────────────────────────────────── */
function Dock() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "home-btn",       icon: FaHome,       tooltip: "Top",        onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }), href: null },
    { id: "about-nav-btn",  icon: null,          tooltip: "About",      onClick: () => scrollTo("about"),      icon_text: "ⓘ" },
    { id: "projects-nav",   icon: null,          tooltip: "Projects",   onClick: () => scrollTo("projects"),   icon_text: "◫" },
    { id: "skills-nav",     icon: null,          tooltip: "Skills",     onClick: () => scrollTo("skills"),     icon_text: "◈" },
    { id: "experience-nav", icon: null,          tooltip: "Experience", onClick: () => scrollTo("experience"), icon_text: "▦" },
    { id: "contact-nav",    icon: null,          tooltip: "Contact",    onClick: () => scrollTo("contact"),    icon_text: "✉" },
  ];

  const externalItems = [
    { id: "github-dock",   icon: FaGithub,   tooltip: "GitHub",   href: "https://github.com/AnshShinde2007" },
    { id: "linkedin-dock", icon: FaLinkedin, tooltip: "LinkedIn", href: "https://www.linkedin.com/in/ansh-shinde-73137b282/" },
    { id: "email-dock",    icon: FaEnvelope, tooltip: "Email",    href: "mailto:anshshinde449@gmail.com" },
    { id: "resume-dock",   icon: FaFileAlt,  tooltip: "Resume",   href: "https://drive.google.com/file/d/1yt-FljGp_P6nR2-O1JwYqV1Xdfw_OrBx/view?usp=sharing" },
  ];

  return (
    <nav className="dock" aria-label="Quick navigation dock">
      {navItems.map(item => (
        <button
          key={item.id}
          id={item.id}
          className="dock-btn dock-btn-tooltip"
          data-tooltip={item.tooltip}
          onClick={item.onClick}
          aria-label={item.tooltip}
        >
          {item.icon
            ? <item.icon aria-hidden="true" />
            : <span aria-hidden="true" style={{ fontSize: "14px" }}>{item.icon_text}</span>
          }
        </button>
      ))}

      <div className="dock-divider" aria-hidden="true" />

      {externalItems.map(item => (
        <a
          key={item.id}
          id={item.id}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="dock-btn dock-btn-tooltip"
          data-tooltip={item.tooltip}
          aria-label={`${item.tooltip} (opens in new tab)`}
        >
          <item.icon aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}

/* ──────────────────────────────────────────────────────────
   HOME — root assembly
   ────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(20,20,20,0.95)",
            color: "rgba(245,244,240,0.9)",
            border: "1px solid rgba(255,255,255,0.10)",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "13px",
            borderRadius: "8px",
          },
        }}
      />

      <a className="skip-link" href="#main-content">Skip to main content</a>

      <main id="main-content" className="page-shell">
        <Hero />

        <hr className="section-divider" />
        <About />

        <hr className="section-divider" />
        <Skills />

        <hr className="section-divider" />
        <Projects />

        <hr className="section-divider" />
        <Experience />

        <hr className="section-divider" />
        <Contact />

        <footer className="footer" role="contentinfo">
          <p className="footer-text">
            Ansh Shinde · Mumbai, India ·{" "}
            <a
              href="https://github.com/AnshShinde2007"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
              aria-label="GitHub profile (opens in new tab)"
            >
              GitHub ↗
            </a>
          </p>
        </footer>
      </main>

      <Dock />
    </>
  );
}
