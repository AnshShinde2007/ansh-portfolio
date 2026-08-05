// src/terminal/commands.js
// Content standard: Problem → Engineering approach → Stack → Result
// No vague claims ("passionate", "innovative"). Only concrete engineering facts.

export const COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "experience",
  "stats",
  "contact",
  "resume",
  "ls",
  "clear",
  "whoami",
  "neofetch",
  "git log",
  "vim",
  "sudo rm -rf /",
  "ssh tokyo",
  "ping japan",
  "cat README.md",
  "date",
  "uname",
  "pwd",
  "history",
  "open",
  "exit"
];

export const getCommandResponse = async (input, terminalState) => {
  const cleanInput = input.trim().toLowerCase();
  const args = cleanInput.split(/\s+/);
  const primaryCmd = args[0];

  // ── Composite: cat <filename> ──────────────────────────────
  if (primaryCmd === "cat") {
    const filename = args[1];
    if (!filename) {
      return {
        output: ["Usage: cat [filename]", "Example: cat README.md"],
        type: "error"
      };
    }
    if (filename === "readme.md") {
      return {
        output: [
          "# ansh-shinde / portfolio",
          "",
          "Full-Stack Developer. Backend Engineer. AI Builder.",
          "Based in Mumbai. Building toward Tokyo.",
          "",
          "This terminal is my portfolio.",
          "Every section is a command.",
          "",
          "Quick start:",
          "  help       — list all commands",
          "  projects   — see what I've built",
          "  about      — who I am",
          "  contact    — get in touch"
        ],
        type: "default"
      };
    }
    if (filename === "resume.pdf") {
      return {
        output: ["Cannot cat binary file 'resume.pdf'. Use the 'resume' command."],
        type: "error"
      };
    }
    return {
      output: [`cat: ${filename}: No such file or directory`],
      type: "error"
    };
  }

  // ── Composite: project <n> ─────────────────────────────────
  if (primaryCmd === "project") {
    const num = args[1];
    if (!num) {
      return {
        output: ["Usage: project [1–5]", "Type 'projects' to list all."],
        type: "error"
      };
    }

    const projectDetails = {
      "1": [
        "╔══════════════════════════════════════════════════╗",
        "║  AGENTPULSE — AI OBSERVABILITY PLATFORM          ║",
        "╚══════════════════════════════════════════════════╝",
        "",
        "  Status:   Shipped",
        "  Stack:    FastAPI · OpenTelemetry · SQLite · Next.js · OTLP",
        "",
        "  Problem:",
        "  AI agents fail silently. Trace data scattered across logs.",
        "  No unified view of cost, latency, or failure modes.",
        "",
        "  Engineering approach:",
        "  Built an OTLP-compatible ingestion layer using OpenTelemetry.",
        "  FastAPI backend stores structured trace spans in SQLite.",
        "  Implemented a healing module that detects anomalies and",
        "  auto-retries failing agent steps with exponential backoff.",
        "  Next.js dashboard surfaces span trees, cost totals, and",
        "  P95 latency breakdowns per agent run.",
        "",
        "  Features:",
        "  → OTLP trace ingestion (spans, events, attributes)",
        "  → Cost tracking per LLM call (tokens × model pricing)",
        "  → Failure detection with auto-heal retry logic",
        "  → Unified debug dashboard with span waterfall view",
        "  → REST API for programmatic trace queries",
        "",
        "  Result:",
        "  Full observability over multi-step agent runs.",
        "  Debug in minutes what would otherwise take hours of log parsing.",
        "",
        "  GitHub: github.com/AnshShinde2007/AgentPulse"
      ],
      "2": [
        "╔══════════════════════════════════════════════════╗",
        "║  JOB RECOMMENDATION PLATFORM                     ║",
        "╚══════════════════════════════════════════════════╝",
        "",
        "  Status:   In active development",
        "  Stack:    Next.js · Node.js · PostgreSQL · OpenAI · pgvector",
        "",
        "  Problem:",
        "  Job boards surface listings by keyword, not competency.",
        "  Candidates see hundreds of irrelevant results. No semantic",
        "  matching between resume skills and actual role requirements.",
        "",
        "  Engineering approach:",
        "  Resume parsing pipeline extracts structured skill entities",
        "  using OpenAI function calling. Skills and job requirements",
        "  are embedded using text-embedding-3-small and stored in",
        "  pgvector. Cosine similarity scoring ranks matches.",
        "  Candidate dashboard shows top matches with match score,",
        "  skill gap analysis, and reasoning.",
        "",
        "  Features:",
        "  → Resume parsing with structured skill extraction",
        "  → Embedding-based semantic job-to-candidate matching",
        "  → Skill gap analysis with actionable recommendations",
        "  → Recommendation scoring engine (0.0–1.0 match score)",
        "  → Candidate dashboard with match explanations",
        "",
        "  GitHub: github.com/AnshShinde2007/job-recommender",
        "  Live:   [in progress]"
      ],
      "3": [
        "╔══════════════════════════════════════════════════╗",
        "║  GITHUB REPO ASSISTANT                           ║",
        "╚══════════════════════════════════════════════════╝",
        "",
        "  Status:   Shipped",
        "  Stack:    OpenAI · React · Node.js · GitHub API · Vector Search",
        "",
        "  Problem:",
        "  Large codebases are hard to navigate for new contributors.",
        "  Docs are often stale or missing. Understanding auth flow,",
        "  data models, or API contracts requires reading hundreds of files.",
        "",
        "  Engineering approach:",
        "  GitHub API pulls repository file tree and raw content.",
        "  Files are chunked, embedded, and stored in an in-memory",
        "  vector index. User queries are embedded and matched against",
        "  relevant code chunks. GPT-4 synthesizes answers with",
        "  file references and line citations.",
        "",
        "  Features:",
        "  → Natural language queries over any GitHub repo",
        "  → Semantic search across all repository files",
        "  → Automatic documentation generation per module",
        "  → File + line citation in every response",
        "",
        "  GitHub: github.com/AnshShinde2007/repo-assistant"
      ],
      "4": [
        "╔══════════════════════════════════════════════════╗",
        "║  URL SHORTENER — SYSTEM DESIGN SHOWCASE          ║",
        "╚══════════════════════════════════════════════════╝",
        "",
        "  Status:   Shipped",
        "  Stack:    Node.js · Redis · PostgreSQL",
        "",
        "  Problem:",
        "  Most URL shorteners are trivial demos with no production",
        "  concerns: no rate limiting, no caching strategy, no analytics,",
        "  no thought given to horizontal scaling.",
        "",
        "  Engineering approach:",
        "  Redirect path hits Redis first — cache miss falls through",
        "  to PostgreSQL and populates cache. TTL-based eviction.",
        "  Rate limiting implemented per user token using a sliding",
        "  window counter in Redis. Analytics writes are fire-and-forget",
        "  to a separate analytics table to avoid write contention.",
        "",
        "  Features:",
        "  → Redis-backed redirect caching (sub-10ms lookups)",
        "  → Sliding window rate limiting per user",
        "  → Click analytics with geographic and referrer data",
        "  → Architecture designed for horizontal read scaling",
        "",
        "  GitHub: github.com/AnshShinde2007/url-shortener"
      ],
      "5": [
        "╔══════════════════════════════════════════════════╗",
        "║  STANDBYME — AMBIENT LOCK SCREEN APP             ║",
        "╚══════════════════════════════════════════════════╝",
        "",
        "  Status:   In active development",
        "  Stack:    React Native (Expo) · TypeScript · Zustand · Expo Modules",
        "",
        "  Problem:",
        "  Phone lock screens are static. Wasted ambient display real",
        "  estate that could show useful at-a-glance data without",
        "  requiring unlock: weather, time zones, Pomodoro, music.",
        "",
        "  Engineering approach:",
        "  Built a widget runtime in Expo with a drag-and-drop layout",
        "  engine. Each widget is a sandboxed component with its own",
        "  data subscription. Zustand manages widget store with",
        "  persistence. Custom Expo native module bridges media session",
        "  data for music controls. Weather uses location + OpenWeather.",
        "  Theme editor allows full palette customization.",
        "",
        "  Features:",
        "  → Configurable widget grid (clock, weather, Pomodoro, music)",
        "  → Custom Expo native module for media session integration",
        "  → Theme editor with full palette customization",
        "  → World clock with multiple time zones",
        "  → Ambient weather backgrounds with condition-based effects",
        "",
        "  GitHub: github.com/AnshShinde2007/StandByMe"
      ]
    };

    const detail = projectDetails[num];
    if (detail) {
      return { output: detail, type: "default" };
    }
    return {
      output: [`Project '${num}' not found. Valid: 1–5. Type 'projects' to list.`],
      type: "error"
    };
  }

  // ── Composite: experience <n> ──────────────────────────────
  if (primaryCmd === "experience") {
    const num = args[1];
    if (num) {
      const expDetails = {
        "1": [
          "SOUL YATRI — Flutter Developer (2025–Present)",
          "─────────────────────────────────────────────",
          "",
          "Mental wellness application, 0 → production.",
          "",
          "  → Built and maintained Flutter frontend from ground up",
          "  → Integrated empathy voice APIs for guided sessions",
          "  → Implemented real-time data features with WebSockets",
          "  → Collaborated with designers on user interaction flows",
          "  → Reduced session load time by optimizing state management",
          "",
          "  Stack: Flutter · Dart · Firebase · WebSockets · REST APIs",
          "  Status: Production — live users"
        ],
        "2": [
          "HACKATHON ENGINEER (2024 — 3 competitions)",
          "─────────────────────────────────────────────",
          "",
          "Shipped production-ready software under 24–48 hour constraints.",
          "",
          "  → Built AI agent orchestration framework in 24 hours",
          "  → Achieved top placement vs 50+ competing teams",
          "  → Handled backend API design, data modeling, and deployment",
          "  → Prototyped a web-based terminal interface (this portfolio's origin)",
          "",
          "  Stack: Node.js · React · PostgreSQL · OpenAI · Docker",
          "  Outcome: 3/3 shipped. 1st place in AI track."
        ],
        "3": [
          "OPEN SOURCE CONTRIBUTOR (2023–Present)",
          "─────────────────────────────────────────────",
          "",
          "Building and contributing to developer tooling.",
          "",
          "  → Published backend templates for Express + PostgreSQL",
          "  → Built AI integration pattern libraries",
          "  → System-design demonstration repositories",
          "  → Contributed CLI feature patches to upstream tooling",
          "",
          "  GitHub: github.com/AnshShinde2007",
          "  Focus:  Developer tools, backend patterns, AI integrations"
        ]
      };

      const expDetail = expDetails[num];
      if (expDetail) {
        return { output: expDetail, type: "default" };
      }
      return {
        output: [`Experience '${num}' not found. Valid: 1–3. Type 'experience' to list.`],
        type: "error"
      };
    }

    return {
      output: [
        "EXPERIENCE ───────────────────────────────────────",
        "",
        "  2025–Now  Soul Yatri",
        "            Flutter Developer",
        "            Mental wellness app, 0 → production",
        "",
        "  2024      Hackathon Circuit (3 competitions)",
        "            Backend & AI Engineer",
        "            Shipped every time. 1st place AI track.",
        "",
        "  2023–Now  Open Source",
        "            @AnshShinde2007 on GitHub",
        "            Backend templates, AI tools, CLI contributions",
        "",
        "Type 'experience [1–3]' for full details."
      ],
      type: "default"
    };
  }

  // ── Composite: open <target> ───────────────────────────────
  if (primaryCmd === "open") {
    const target = args[1];
    const links = {
      github:   "https://github.com/AnshShinde2007",
      linkedin: "https://www.linkedin.com/in/ansh-shinde-73137b282/",
      email:    "mailto:anshshinde449@gmail.com",
      resume:   "https://drive.google.com/file/d/1yt-FljGp_P6nR2-O1JwYqV1Xdfw_OrBx/view?usp=sharing"
    };

    if (!target) {
      return {
        output: [
          "Usage: open [github|linkedin|email|resume]",
          "",
          "  open github    — github.com/AnshShinde2007",
          "  open linkedin  — linkedin.com/in/ansh-shinde",
          "  open email     — anshshinde449@gmail.com",
          "  open resume    — download PDF"
        ],
        type: "error"
      };
    }

    const url = links[target];
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      return {
        output: [`Opening ${target}...`, `→ ${url}`],
        type: "success"
      };
    }
    return {
      output: [`Unknown target '${target}'. Try: github, linkedin, email, resume`],
      type: "error"
    };
  }

  // ── Standard commands ──────────────────────────────────────
  switch (primaryCmd) {

    case "help":
      return {
        output: [
          "ANSH-OS — available commands",
          "",
          "  about          Who is Ansh",
          "  skills         Tech stack and engineering domains",
          "  projects       5 featured projects with architecture details",
          "  experience     Work history, internships, and outcomes",
          "  contact        How to reach me",
          "  resume         Download resume PDF",
          "  stats          Live GitHub and coding stats",
          "  ls             List available sections",
          "  whoami         Current user",
          "  neofetch       System info with avatar",
          "  open [target]  Open github, linkedin, email, or resume",
          "  clear          Clear the terminal",
          "",
          "Easter eggs (try them):",
          "  git log        Commit history",
          "  vim            Good luck getting out",
          "  ssh tokyo      Future pending",
          "  ping japan     Goal reached",
          "  sudo rm -rf /  Nice try",
          "  neofetch       System info",
          "  date / uname / pwd",
          "",
          "Type any command to get started."
        ],
        type: "success"
      };

    case "about":
      return {
        output: [
          "╔══════════════════════════════════════════════════╗",
          "║              ANSH SHINDE                         ║",
          "║  Full-Stack Developer · Backend Engineer         ║",
          "║  AI Builder · Mumbai, India                      ║",
          "╚══════════════════════════════════════════════════╝",
          "",
          "B.E. Computer Science — currently in final year.",
          "",
          "Started with HTML and CSS. Got immediately pulled into",
          "backend architecture. Now building AI products on top",
          "of distributed systems and observability infrastructure.",
          "",
          "Engineering focus:",
          "  → Backend systems: REST APIs, auth, caching, queues",
          "  → AI products: RAG pipelines, agent frameworks, LLM tooling",
          "  → Developer tooling: CLIs, observability, debugging dashboards",
          "  → Full-stack: React, Next.js, Flutter on the frontend",
          "",
          "Not interested in building tutorials or templates.",
          "Interested in software that actually runs in production.",
          "",
          "Long-term goal: Software Engineer in Japan.",
          "Current focus: Ship. Learn. Repeat."
        ],
        type: "default"
      };

    case "skills":
      return {
        output: [
          "SKILLS — ansh@portfolio",
          "",
          "Backend ─────────────────────────────────────────",
          "  Node.js      Express      FastAPI (Python)",
          "  PostgreSQL   Redis        MongoDB",
          "  REST APIs    JWT Auth     WebSockets",
          "",
          "Frontend ────────────────────────────────────────",
          "  React        Next.js      TypeScript",
          "  Flutter      Tailwind CSS Vite",
          "",
          "AI / ML ─────────────────────────────────────────",
          "  OpenAI APIs  RAG          pgvector / Vector DBs",
          "  AI Agents    LangChain    OpenTelemetry",
          "  Embeddings   Prompt Eng.  OTLP",
          "",
          "DevOps ──────────────────────────────────────────",
          "  Docker       Linux        Git",
          "  AWS          CI/CD        Nginx",
          "",
          "Databases ───────────────────────────────────────",
          "  PostgreSQL   SQLite       MongoDB",
          "  Redis        pgvector     Firebase"
        ],
        type: "default"
      };

    case "projects":
      return {
        output: [
          "PROJECTS — 5 found",
          "",
          "  [1] agentpulse          AI observability · OTLP · FastAPI",
          "  [2] job-recommender     Semantic matching · pgvector · OpenAI",
          "  [3] repo-assistant      Codebase RAG · GitHub API · Vector Search",
          "  [4] url-shortener       Redis caching · Rate limiting · Analytics",
          "  [5] standbyme           Ambient widgets · Expo · React Native",
          "",
          "Type 'project [1–5]' for architecture, stack, and outcomes."
        ],
        type: "default"
      };

    case "contact":
      return {
        output: [
          "CONTACT ─────────────────────────────────────────",
          "",
          "  Email:    anshshinde449@gmail.com",
          "  GitHub:   github.com/AnshShinde2007",
          "  LinkedIn: linkedin.com/in/ansh-shinde-73137b282",
          "  Resume:   type 'resume' to download",
          "",
          "  Or: 'open github', 'open linkedin', 'open email'",
          "",
          "Open for:",
          "  → Full-time software engineering roles",
          "  → Backend / AI / full-stack internships",
          "  → Collaboration on meaningful technical projects",
          "  → Remote roles and relocation opportunities",
          "",
          "Based in Mumbai. Available immediately."
        ],
        type: "default"
      };

    case "ls":
      return {
        output: [
          "drwxr-xr-x  about/",
          "drwxr-xr-x  projects/",
          "drwxr-xr-x  skills/",
          "drwxr-xr-x  experience/",
          "drwxr-xr-x  contact/",
          "-rw-r--r--  resume.pdf",
          "-rw-r--r--  README.md",
          "-rw-r--r--  .bashrc",
          "-rw-r--r--  .gitconfig"
        ],
        type: "success"
      };

    case "whoami":
      return {
        output: [
          terminalState?.username || "guest",
          "",
          "(Probably a recruiter, a collaborator, or Ansh himself.)"
        ],
        type: "default"
      };

    case "date":
      return {
        output: [new Date().toString()],
        type: "default"
      };

    case "uname":
      return {
        output: [
          args[1] === "-a"
            ? "ansh-os 1.0.0 #1 SMP Mumbai, India x86_64 GNU/Linux"
            : "ansh-os"
        ],
        type: "default"
      };

    case "pwd":
      return {
        output: ["/home/ansh/portfolio"],
        type: "default"
      };

    case "history":
      return {
        output: [
          "# Session history is managed in terminal state.",
          "# Use ↑ / ↓ arrow keys to navigate command history.",
          "",
          "Common: help, about, projects, skills, experience, contact"
        ],
        type: "dim"
      };

    case "git": {
      if (args[1] === "log") {
        return {
          output: [
            "commit a3f92c1 (HEAD -> main, origin/main)",
            "Author: Ansh Shinde <anshshinde449@gmail.com>",
            "Date:   " + new Date().toDateString(),
            "",
            "    finally fixed that bug",
            "",
            "commit 8b2e441",
            "    it broke again",
            "",
            "commit 3d901f7",
            "    okay now it's really fixed",
            "",
            "commit c12aa3b",
            "    why does this work",
            "",
            "commit 7f43901",
            "    initial commit"
          ],
          type: "default"
        };
      }
      if (args[1] === "status") {
        return {
          output: [
            "On branch main",
            "Your branch is up to date with 'origin/main'.",
            "",
            "nothing to commit, working tree clean"
          ],
          type: "success"
        };
      }
      return {
        output: ["git: unrecognized command. Try 'git log' or 'git status'"],
        type: "error"
      };
    }

    case "sudo": {
      if (args.slice(1).join(" ") === "rm -rf /") {
        return {
          output: [
            "Nice try.",
            "Permission denied.",
            "(Also, please don't.)"
          ],
          type: "error"
        };
      }
      return {
        output: ["sudo: permission denied. This incident will be reported."],
        type: "error"
      };
    }

    case "ssh": {
      if (args[1] === "tokyo") {
        return {
          output: [
            "Connecting to tokyo.anshshinde.dev...",
            "ssh: connect to host tokyo port 22: Future pending."
          ],
          type: "default"
        };
      }
      return {
        output: ["ssh: host not found. Try 'ssh tokyo'"],
        type: "error"
      };
    }

    case "ping": {
      if (args[1] === "japan") {
        return {
          output: [
            "PING japan: 56 data bytes",
            "64 bytes from japan: icmp_seq=0 ttl=64 time=Goal reached ms",
            "64 bytes from japan: icmp_seq=1 ttl=64 time=Getting closer ms",
            "",
            "--- japan ping statistics ---",
            "2 packets transmitted, 2 received, 0% packet loss"
          ],
          type: "default"
        };
      }
      return {
        output: ["Usage: ping japan"],
        type: "error"
      };
    }

    case "neofetch":
      return { action: "neofetch" };

    case "clear":
      return { action: "clear" };

    case "vim":
      return { action: "vim" };

    case "resume":
      return { action: "resume" };

    case "stats":
      return { action: "stats" };

    case "gui":
    case "exit":
      return { action: "gui" };

    default:
      return {
        output: [`command not found: ${primaryCmd} — type 'help' to see available commands`],
        type: "error"
      };
  }
};
