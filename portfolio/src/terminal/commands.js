// src/terminal/commands.js

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
  "gui",
  "exit"
];

export const getCommandResponse = async (input, terminalState) => {
  const cleanInput = input.trim().toLowerCase();
  const args = cleanInput.split(/\s+/);
  const primaryCmd = args[0];

  // Handle nested/composite commands like `cat README.md` or `project 1`
  if (primaryCmd === "cat") {
    const filename = args[1];
    if (!filename) {
      return {
        output: ["Usage: cat [filename]"],
        type: "error"
      };
    }
    if (filename.toLowerCase() === "readme.md") {
      return {
        output: [
          "# ansh-shinde / portfolio",
          "",
          "Full-Stack Developer. Backend Engineer. AI Builder.",
          "Based in Mumbai. Building toward Tokyo.",
          "",
          "This terminal is my portfolio.",
          "Every section is a command.",
          "Type 'help' to start."
        ],
        type: "default"
      };
    } else if (filename.toLowerCase() === "resume.pdf") {
      return {
        output: ["Cannot cat binary file 'resume.pdf'. Use 'resume' command to download."],
        type: "error"
      };
    } else {
      return {
        output: [`cat: ${filename}: No such file or directory`],
        type: "error"
      };
    }
  }

  if (primaryCmd === "project") {
    const num = args[1];
    if (!num) {
      return {
        output: ["Usage: project [1|2|3] (e.g. 'project 1')"],
        type: "error"
      };
    }
    if (num === "1") {
      return {
        output: [
          "╔══════════════════════════════════════════════╗",
          "║  JOB RECOMMENDATION PLATFORM                 ║",
          "╚══════════════════════════════════════════════╝",
          "",
          "  Status:   In development",
          "  Stack:    Next.js · Node.js · PostgreSQL · OpenAI",
          "",
          "  AI-powered job matching engine.",
          "  Parses resumes, extracts skills, matches against",
          "  live listings using embedding similarity.",
          "",
          "  Features:",
          "  → Resume analysis and skill extraction",
          "  → Semantic job-to-candidate matching",
          "  → Recommendation scoring engine",
          "  → Candidate dashboard",
          "",
          "  GitHub: github.com/anshshinde/job-recommender",
          "  Live:   [in progress]"
        ],
        type: "default"
      };
    } else if (num === "2") {
      return {
        output: [
          "╔══════════════════════════════════════════════╗",
          "║  GITHUB REPO ASSISTANT                       ║",
          "╚══════════════════════════════════════════════╝",
          "",
          "  Status:   Shipped",
          "  Stack:    OpenAI · React · Node.js",
          "",
          "  Chat with any GitHub repository.",
          "  Ask questions about the codebase, search across",
          "  files, generate documentation automatically.",
          "",
          "  Features:",
          "  → Natural language codebase queries",
          "  → Repository-wide semantic search",
          "  → Auto documentation generation",
          "",
          "  GitHub: github.com/anshshinde/repo-assistant"
        ],
        type: "default"
      };
    } else if (num === "3") {
      return {
        output: [
          "╔══════════════════════════════════════════════╗",
          "║  URL SHORTENER — SYSTEM DESIGN SHOWCASE      ║",
          "╚══════════════════════════════════════════════╝",
          "",
          "  Status:   Shipped",
          "  Stack:    Node.js · Redis · PostgreSQL",
          "",
          "  Not just a URL shortener.",
          "  Built to demonstrate distributed systems thinking:",
          "  rate limiting, caching layers, analytics pipeline,",
          "  horizontal scaling concepts.",
          "",
          "  Features:",
          "  → Redis-backed caching (sub-10ms lookups)",
          "  → Per-user rate limiting",
          "  → Click analytics and geographic data",
          "  → Load balancing ready",
          "",
          "  GitHub: github.com/anshshinde/url-shortener"
        ],
        type: "default"
      };
    } else {
      return {
        output: [`Project '${num}' not found. Type 'projects' to list.`],
        type: "error"
      };
    }
  }

  if (primaryCmd === "experience") {
    const num = args[1];
    if (num) {
      if (num === "1") {
        return {
          output: [
            "Finance Internship (2024)",
            "-------------------------",
            "- Built robust backend integrations for financial reporting tools.",
            "- Improved system performance and API query latency by 25%.",
            "- Streamlined database architectures and indices in PostgreSQL."
          ],
          type: "default"
        };
      } else if (num === "2") {
        return {
          output: [
            "Hackathon Winner (2024)",
            "-------------------------",
            "- Developed AI agent framework under tight timeline.",
            "- Achieved top placement out of 50+ competing teams.",
            "- Handled backend integrations and client-side web terminal prototype."
          ],
          type: "default"
        };
      } else if (num === "3") {
        return {
          output: [
            "Open Source Contributions (2023)",
            "-------------------------",
            "- Contributed to various Developer Tools & CLI repositories.",
            "- Patched security and package dependency vulnerabilities.",
            "- Wrote comprehensive test suites and docs."
          ],
          type: "default"
        };
      } else {
        return {
          output: [`Experience index '${num}' not found. Type 'experience' to list.`],
          type: "error"
        };
      }
    }

    return {
      output: [
        "EXPERIENCE ───────────────────────────────────",
        "",
        "  2024  Finance Internship",
        "        Backend Developer Intern",
        "        Built analytics dashboard, improved API query latency by 25%",
        "",
        "  2024  Hackathon",
        "        Developer & Planner",
        "        AI Agent orchestrator, won 1st Place",
        "",
        "  2023  Open Source Contributions",
        "        Developer tools & packages",
        "        Contributed CLI features and performance patches",
        "",
        "Type 'experience [index]' (e.g. 'experience 1') for full details."
      ],
      type: "default"
    };
  }

  // Handle standard commands
  switch (primaryCmd) {
    case "help":
      return {
        output: [
          "Available commands:",
          "",
          "  about          Who is Ansh",
          "  skills         Tech stack and expertise",
          "  projects       Featured projects",
          "  experience     Work history and internships",
          "  contact        How to reach me",
          "  resume         Download resume",
          "  stats          Live GitHub and coding stats",
          "  ls             List available sections",
          "  clear          Clear the terminal",
          "  whoami         You already know",
          "",
          "Type any command to get started."
        ],
        type: "success"
      };

    case "about":
      return {
        output: [
          "╔══════════════════════════════════════════════╗",
          "║              ANSH SHINDE                     ║",
          "║  Full-Stack Developer · Backend Engineer     ║",
          "║  AI Builder · Mumbai, India                  ║",
          "╚══════════════════════════════════════════════╝",
          "",
          "B.E. Computer Science student obsessed with",
          "building things that work at scale.",
          "",
          "Started with web dev. Got pulled into backend",
          "architecture. Now building AI products on top",
          "of distributed systems.",
          "",
          "Long-term goal: Software Engineer in Japan.",
          "Current focus: Ship more. Learn more. Repeat."
        ],
        type: "default"
      };

    case "skills":
      return {
        output: [
          "SKILLS — ansh@portfolio",
          "",
          "Backend ──────────────────────────────────────",
          "  Node.js      Express      PostgreSQL",
          "  Redis        MongoDB      REST APIs",
          "  Auth Systems",
          "",
          "Frontend ─────────────────────────────────────",
          "  React        Next.js      TypeScript",
          "  Tailwind CSS",
          "",
          "AI / ML ──────────────────────────────────────",
          "  OpenAI APIs  RAG          Vector DBs",
          "  AI Agents",
          "",
          "DevOps ───────────────────────────────────────",
          "  Docker       AWS          Linux",
          "  CI/CD        Git"
        ],
        type: "default"
      };

    case "projects":
      return {
        output: [
          "PROJECTS — 3 found",
          "",
          "  [1] job-recommender     AI matching · Resume analysis",
          "  [2] repo-assistant      Codebase chat · Doc generation",
          "  [3] url-shortener       Rate limiting · Redis · Analytics",
          "",
          "Type 'project 1', 'project 2', or 'project 3' for details."
        ],
        type: "default"
      };

    case "contact":
      return {
        output: [
          "CONTACT ──────────────────────────────────────",
          "",
          "  Email:    ansh@anshshinde.dev",
          "  GitHub:   github.com/anshshinde",
          "  LinkedIn: linkedin.com/in/anshshinde",
          "  Resume:   type 'resume' to download",
          "",
          "  Or just say hi. I don't bite."
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
          "-rw-r--r--  README.md"
        ],
        type: "success"
      };

    case "whoami":
      return {
        output: [
          terminalState?.username || "guest",
          "",
          "(But you're probably a recruiter, a collaborator, or Ansh himself.)"
        ],
        type: "default"
      };

    case "git": {
      if (args[1] === "log") {
        return {
          output: [
            "commit a3f92c1 — \"finally fixed that bug\"",
            "commit 8b2e441 — \"it broke again\"",
            "commit 3d901f7 — \"okay now it's really fixed\"",
            "commit c12aa3b — \"why does this work\"",
            "commit 7f43901 — \"initial commit\""
          ],
          type: "default"
        };
      }
      return {
        output: ["git: Command not found. Try 'git log'"],
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
          type: "red"
        };
      }
      return {
        output: ["sudo: Permission denied. guest is not in the sudoers file."],
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
        output: ["ssh: host connection failed. Try 'ssh tokyo'"],
        type: "error"
      };
    }

    case "ping": {
      if (args[1] === "japan") {
        return {
          output: [
            "PING japan: 56 data bytes",
            "64 bytes from japan: icmp_seq=0 ttl=64 time=Goal reached ms"
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
      // Action is handled inside Terminal.jsx state to show rich image layout
      return {
        action: "neofetch"
      };

    case "clear":
      // Action is handled inside Terminal.jsx state
      return {
        action: "clear"
      };

    case "vim":
      // Action is handled inside Terminal.jsx state
      return {
        action: "vim"
      };

    case "resume":
      // Trigger download inside Terminal.jsx state
      return {
        action: "resume"
      };

    case "stats":
      // Trigger fetch inside Terminal.jsx state
      return {
        action: "stats"
      };

    case "gui":
    case "exit":
      return {
        action: "gui"
      };

    default:
      return {
        output: [`command not found: ${primaryCmd} — type 'help'`],
        type: "error"
      };
  }
};
