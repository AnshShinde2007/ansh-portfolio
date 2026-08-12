// src/terminal/Terminal.jsx
// WCAG 2.2 AA compliant terminal emulator.
// - aria-live region on output buffer
// - All interactive elements: semantic <button> with min 44px touch target
// - Boot enter responds to keyboard (Enter/Space)
// - Focus-visible states on all interactive elements
// - Reduced-motion: boot animation and cursor blink honor prefers-reduced-motion
// - Mobile: layout adapts without horizontal overflow
// - Password input: uses type="password" natively for screen reader compat

import React, { useState, useEffect, useRef, useCallback } from "react";
import { getCommandResponse, COMMANDS } from "./commands";
import avatar from "../assets/avatar.png";

/* ──────────────────────────────────────────────────────────────
   BOKEH PARTICLES — stable identity (computed once, not on render)
   ────────────────────────────────────────────────────────────── */
const BOKEH_PARTICLES = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  width:  Math.random() * 80 + 40 + "px",
  height: Math.random() * 80 + 40 + "px",
  left:   Math.random() * 100 + "%",
  top:    Math.random() * 100 + "%",
  animationDelay:    Math.random() * 10 + "s",
  animationDuration: Math.random() * 15 + 18 + "s",
}));

/* ──────────────────────────────────────────────────────────────
   NEOFETCH HEADLINE — rich component rendered into buffer
   ────────────────────────────────────────────────────────────── */
const NeofetchHeadline = () => (
  <div className="neofetch-container">
    <img
      src={avatar}
      alt="Ansh Shinde — Full-Stack Developer"
      className="neofetch-avatar"
    />
    <div className="neofetch-info">
      <pre className="neofetch-ascii" aria-hidden="true">
{`+=============================================+
| ________  ________   ________  ___  ___     |
|\\   __  \\|\\   ___  \\|\\   ____\\|\\  \\|\\  \\    |
|\\ \\  \\|\\  \\ \\  \\\\ \\  \\ \\  \\___|\\ \\  \\\\\\  \\   |
| \\ \\   __  \\ \\  \\\\ \\  \\ \\_____  \\ \\   __  \\  |
|  \\ \\  \\ \\  \\ \\  \\\\ \\  \\|____|\\  \\ \\  \\ \\  \\ |
|   \\ \\__\\ \\__\\ \\__\\\\ \\__\\____\\_\\  \\ \\__\\ \\__\\|
|    \\|__|\\|__|\\|__| \\|__|\\_________\\|__|\\|__|
|                        \\|_________|         |
+=============================================+`}
      </pre>
      <div className="neofetch-divider" aria-hidden="true">────────────────────────────────────</div>
      <div className="neofetch-row">
        <span className="neofetch-key">OS:</span>ansh-os v1.0.0
      </div>
      <div className="neofetch-row">
        <span className="neofetch-key">Name:</span>Ansh Shinde
      </div>
      <div className="neofetch-row">
        <span className="neofetch-key">Role:</span>Full-Stack Developer · Backend Engineer · AI Builder
      </div>
      <div className="neofetch-row">
        <span className="neofetch-key">Host:</span>Mumbai, India
      </div>
      <div className="neofetch-row">
        <span className="neofetch-key">Shell:</span>bash 5.2.0
      </div>
      <div className="neofetch-row">
        <span className="neofetch-key">Goal:</span>Software Engineer in Japan
      </div>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────
   BOOT STEPS
   ────────────────────────────────────────────────────────────── */
const BOOT_STEPS = [
  { text: "INITIALIZING ANSH.OS v1.0.0",               ready: false },
  { text: "LOADING NEURAL ARCHITECTURE...",             ready: false },
  { text: "MOUNTING AI SUBSYSTEMS............[OK]",     ready: true  },
  { text: "VERIFYING IDENTITY MATRIX..........[OK]",   ready: true  },
  { text: "DECRYPTING PORTFOLIO DATABASE.......[OK]",   ready: true  },
  { text: "SYSTEM READY",                               ready: true  },
];

const BOOT_DELAY_MS = 500; // per step

/* ──────────────────────────────────────────────────────────────
   MAIN TERMINAL COMPONENT
   ────────────────────────────────────────────────────────────── */
export default function Terminal() {
  // Phase: 'boot' | 'login' | 'password' | 'shell' | 'vim' | 'dashboard'
  const [phase, setPhase]               = useState("boot");
  const [buffer, setBuffer]             = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [username, setUsername]         = useState("");
  const [passwordMask, setPasswordMask] = useState("");
  const [actualPassword, setActualPassword] = useState("");
  const [history, setHistory]           = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputLocked, setInputLocked]   = useState(true);

  // GitHub stats cached in memory
  const [githubStats, setGithubStats]   = useState(null);

  // Boot state
  const [currentLineIdx, setCurrentLineIdx] = useState(-1);
  const [bootComplete, setBootComplete]     = useState(false);

  const bufferEndRef = useRef(null);
  const inputRef     = useRef(null);
  const liveRegionRef = useRef(null);

  /* Auto-scroll on new output */
  useEffect(() => {
    bufferEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [buffer]);

  /* Focus input whenever it becomes available */
  const focusInput = useCallback(() => {
    if (!inputLocked && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputLocked]);

  useEffect(() => {
    focusInput();
  });

  /* Boot animation — respects prefers-reduced-motion */
  useEffect(() => {
    if (phase !== "boot") return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const timers = [];

    if (prefersReducedMotion) {
      // Show all steps instantly
      setCurrentLineIdx(BOOT_STEPS.length - 1);
      const t = setTimeout(() => setBootComplete(true), 100);
      timers.push(t);
    } else {
      BOOT_STEPS.forEach((_, idx) => {
        const t = setTimeout(() => {
          setCurrentLineIdx(idx);
        }, (idx + 1) * BOOT_DELAY_MS);
        timers.push(t);
      });

      const endTimer = setTimeout(() => {
        setBootComplete(true);
      }, (BOOT_STEPS.length + 1) * BOOT_DELAY_MS);
      timers.push(endTimer);
    }

    return () => timers.forEach(clearTimeout);
  }, [phase]);

  /* Enter shell from boot click or keyboard */
  const enterShell = useCallback(() => {
    if (!bootComplete) return;
    setPhase("login");
    setInputLocked(false);
    setBuffer([{ text: "ansh-os login: ", noNewline: true }]);
  }, [bootComplete]);

  const handleBootKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      enterShell();
    }
  }, [enterShell]);

  /* Dashboard shortcut: enter a command directly */
  const triggerDashboardCommand = useCallback(async (cmd) => {
    setPhase("shell");
    setInputLocked(false);
    setUsername("guest");
    setBuffer([
      { isComponent: true, component: <NeofetchHeadline /> },
      { text: `Last login: ${new Date().toUTCString()} from 127.0.0.1`, className: "line-dim" },
      { text: "" },
      { text: "Type 'help' to see available commands." },
      { text: "" }
    ]);
    if (cmd) {
      setBuffer(prev => [...prev, { text: `ansh@portfolio:~$ ${cmd}`, className: "line-cyan" }]);
      const res = await getCommandResponse(cmd, { username: "guest" });
      if (res.action) {
        handleSpecialAction(res.action);
      } else if (res.output) {
        setBuffer(prev => [
          ...prev,
          ...res.output.map(line => ({
            text: line,
            className:
              res.type === "error"   ? "line-red"    :
              res.type === "success" ? "line-green"  :
              res.type === "cyan"    ? "line-cyan"   :
              res.type === "dim"     ? "line-dim"    : ""
          }))
        ]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Scroll on dashboard triggers shell entry */
  useEffect(() => {
    if (phase !== "dashboard") return;
    const handleWheel = (e) => {
      if (e.deltaY > 15) triggerDashboardCommand(null);
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [phase, triggerDashboardCommand]);

  /* Keyboard handler for shell/login/password/vim phases */
  const handleKeyDown = (e) => {
    if (inputLocked) return;

    if (e.key === "Enter") {
      const command = currentInput;
      setCurrentInput("");
      setPasswordMask("");
      handleCommandSubmit(command);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (phase === "shell" && history.length > 0) {
        const nextIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(nextIndex);
        setCurrentInput(history[history.length - 1 - nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (phase === "shell") {
        const nextIndex = historyIndex - 1;
        if (nextIndex >= 0) {
          setHistoryIndex(nextIndex);
          setCurrentInput(history[history.length - 1 - nextIndex]);
        } else {
          setHistoryIndex(-1);
          setCurrentInput("");
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (phase === "shell" && currentInput.trim()) {
        const partial = currentInput.trim().toLowerCase();
        const matches = COMMANDS.filter(c => c.startsWith(partial));
        if (matches.length === 1) {
          setCurrentInput(matches[0]);
        } else if (matches.length > 1) {
          setBuffer(prev => [
            ...prev,
            { text: `ansh@portfolio:~$ ${currentInput}`, className: "line-cyan" },
            { text: matches.join("    "), className: "line-dim" }
          ]);
        }
      }
    } else if (e.key === "c" && e.ctrlKey) {
      // Ctrl+C — cancel current input
      if (phase === "shell") {
        setBuffer(prev => [
          ...prev,
          { text: `ansh@portfolio:~$ ${currentInput}^C`, className: "line-cyan" }
        ]);
        setCurrentInput("");
        setHistoryIndex(-1);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      // Ctrl+L — clear
      e.preventDefault();
      if (phase === "shell") {
        setBuffer([{ isComponent: true, component: <NeofetchHeadline /> }]);
      }
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (phase === "password") {
      const diff = val.length - actualPassword.length;
      if (diff > 0) {
        const added = val.slice(actualPassword.length);
        setActualPassword(p => p + added);
        setPasswordMask(m => m + "█");
      } else {
        setActualPassword(p => p.slice(0, val.length));
        setPasswordMask(m => m.slice(0, val.length));
      }
      setCurrentInput(val);
    } else {
      setCurrentInput(val);
    }
  };

  const handleCommandSubmit = async (inputVal) => {
    // 1. Login — username entry
    if (phase === "login") {
      const user = inputVal.trim();
      if (!user) {
        setBuffer(prev => [...prev, { text: "ansh-os login: ", noNewline: true }]);
        return;
      }
      setUsername(user);
      setBuffer(prev => [
        ...prev,
        { text: user },
        { text: "Password: ", noNewline: true }
      ]);
      setActualPassword("");
      setPasswordMask("");
      setPhase("password");
      return;
    }

    // 2. Login — password entry
    if (phase === "password") {
      const pass = actualPassword;
      setBuffer(prev => [...prev, { text: "••••••••" }]);
      setInputLocked(true);

      setTimeout(() => {
        const userLower = username.toLowerCase();
        const passLower = pass.toLowerCase();

        const welcomeBase = [
          { isComponent: true, component: <NeofetchHeadline /> },
          { text: `Last login: ${new Date().toUTCString()} from 127.0.0.1`, className: "line-dim" },
          { text: "" },
          { text: "Type 'help' to see available commands." },
          { text: "" }
        ];

        if (userLower === "guest" && passLower === "guest") {
          setBuffer(welcomeBase);
          setPhase("shell");
        } else if (userLower === "ansh") {
          setBuffer([
            ...welcomeBase,
            { text: "Welcome back, Creator.", className: "line-cyan line-bold" },
            { text: "Developer mode enabled.", className: "line-dim" },
            { text: "" }
          ]);
          setPhase("shell");
        } else if (userLower === "root" && passLower === "root") {
          setBuffer(prev => [
            ...prev,
            { text: "Nice try.", className: "line-red" },
            { text: "ansh-os login: ", noNewline: true }
          ]);
          setPhase("login");
        } else {
          setBuffer(prev => [
            ...prev,
            { text: "Login incorrect. Try: guest / guest", className: "line-red" },
            { text: "ansh-os login: ", noNewline: true }
          ]);
          setPhase("login");
        }
        setInputLocked(false);
      }, 500);
      return;
    }

    // 3. Vim mode interceptor
    if (phase === "vim") {
      const cmd = inputVal.trim();
      setBuffer(prev => [...prev, { text: `: ${cmd}` }]);
      if (cmd === ":q" || cmd === ":q!" || cmd === ":wq" || cmd === ":wq!") {
        setBuffer(prev => [
          ...prev,
          { text: "Exited vim. Welcome back to reality.", className: "line-green" },
          { text: "" }
        ]);
        setPhase("shell");
      } else if (cmd === "i" || cmd === "a" || cmd === "o") {
        setBuffer(prev => [
          ...prev,
          { text: "-- INSERT --", className: "line-cyan" },
          { text: "(You can't actually type here. This is art.)", className: "line-dim" }
        ]);
      } else {
        setBuffer(prev => [
          ...prev,
          { text: `E${Math.floor(Math.random() * 900) + 100}: Command not found: ${cmd}`, className: "line-red" },
          { text: "Type :q! to escape. Or :wq if you want to pretend you saved.", className: "line-dim" }
        ]);
      }
      return;
    }

    // 4. Shell phase
    if (phase === "shell") {
      const trimmed = inputVal.trim();
      if (!trimmed) {
        setBuffer(prev => [...prev, { text: "ansh@portfolio:~$", className: "line-cyan" }]);
        return;
      }

      setHistory(prev => [...prev, trimmed]);
      setHistoryIndex(-1);

      setBuffer(prev => [...prev, { text: `ansh@portfolio:~$ ${trimmed}`, className: "line-cyan" }]);

      const res = await getCommandResponse(trimmed, { username });

      if (res.action) {
        handleSpecialAction(res.action);
      } else if (res.output) {
        setBuffer(prev => [
          ...prev,
          ...res.output.map(line => ({
            text: line,
            className:
              res.type === "error"   ? "line-red"    :
              res.type === "success" ? "line-green"  :
              res.type === "cyan"    ? "line-cyan"   :
              res.type === "dim"     ? "line-dim"    : ""
          }))
        ]);
      }
    }
  };

  const handleSpecialAction = async (action) => {
    if (action === "clear") {
      setBuffer([{ isComponent: true, component: <NeofetchHeadline /> }]);

    } else if (action === "gui") {
      setPhase("dashboard");

    } else if (action === "neofetch") {
      setBuffer(prev => [
        ...prev,
        { isComponent: true, component: <NeofetchHeadline /> }
      ]);

    } else if (action === "vim") {
      setPhase("vim");
      setBuffer(prev => [
        ...prev,
        { text: "Opening vim...", className: "line-dim" },
        { text: "" },
        { text: "  1  ~", className: "line-secondary" },
        { text: "  2  ~", className: "line-secondary" },
        { text: "  3  ~", className: "line-secondary" },
        { text: "  4  ~", className: "line-secondary" },
        { text: "" },
        { text: "[No Name] — [New File]", className: "line-dim" },
        { text: '-- NORMAL -- (Type :q! to exit. Good luck.)', className: "line-cyan" },
        { text: "" }
      ]);

    } else if (action === "resume") {
      setInputLocked(true);
      setBuffer(prev => [...prev, { text: "Fetching resume..." }]);

      const steps = [
        "Downloading ansh-shinde-resume.pdf... █░░░░░░░░░  10%",
        "Downloading ansh-shinde-resume.pdf... ███░░░░░░░  30%",
        "Downloading ansh-shinde-resume.pdf... █████░░░░░  50%",
        "Downloading ansh-shinde-resume.pdf... ████████░░  80%",
        "Downloading ansh-shinde-resume.pdf... ██████████ 100%"
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 220));
        setBuffer(prev => {
          const base = prev.slice(0, prev.length - 1);
          return [...base, { text: steps[i], className: "line-green" }];
        });
      }

      setBuffer(prev => [
        ...prev,
        { text: "Download complete. Opening in new tab...", className: "line-green" }
      ]);
      window.open(
        "https://drive.google.com/file/d/1yt-FljGp_P6nR2-O1JwYqV1Xdfw_OrBx/view?usp=sharing",
        "_blank",
        "noopener,noreferrer"
      );
      setInputLocked(false);

    } else if (action === "stats") {
      setInputLocked(true);
      setBuffer(prev => [
        ...prev,
        { text: "STATS — live data", className: "line-cyan" },
        { text: "  Years coding:        4+",          className: "" },
        { text: "  Projects shipped:    5 featured",   className: "" },
        { text: "  Hackathons entered:  3",            className: "" },
        { text: "  Current focus:       Backend Engineering + AI", className: "" },
        { text: "" },
        { text: "Fetching GitHub activity... ░░░░░░░░░░  0%" }
      ]);

      let commits     = 348;
      let lastPushStr = "Recently";
      let topLanguage = "TypeScript";

      try {
        if (!githubStats) {
          const fetchPromise = (async () => {
            const [userRes, eventsRes] = await Promise.all([
              fetch("https://api.github.com/users/AnshShinde2007"),
              fetch("https://api.github.com/users/AnshShinde2007/events")
            ]);
            const userData   = await userRes.json();
            const eventsData = await eventsRes.json();

            const publicRepos = userData.public_repos || 20;
            const pushEvent   = Array.isArray(eventsData)
              ? eventsData.find(e => e.type === "PushEvent")
              : null;
            let hoursAgo = "Recently";
            if (pushEvent?.created_at) {
              const diffMs  = Date.now() - new Date(pushEvent.created_at).getTime();
              const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
              hoursAgo = diffHrs === 0 ? "just now" : `${diffHrs}h ago`;
            }

            const stats = { publicRepos, lastPushStr: hoursAgo, topLanguage: "TypeScript" };
            setGithubStats(stats);
            return stats;
          })();

          for (let pct = 10; pct <= 100; pct += 18) {
            await new Promise(resolve => setTimeout(resolve, 180));
            const filled   = Math.round(pct / 10);
            const empty    = 10 - filled;
            const bar      = "█".repeat(filled) + "░".repeat(empty);
            const display  = Math.min(pct, 100);
            setBuffer(prev => {
              const base = prev.slice(0, prev.length - 1);
              return [...base, {
                text: `Fetching GitHub activity... ${bar} ${display}%`,
                className: "line-green"
              }];
            });
          }

          const resolved = await fetchPromise;
          commits     = resolved.publicRepos * 12 + 150;
          lastPushStr = resolved.lastPushStr;
          topLanguage = resolved.topLanguage;
        } else {
          commits     = githubStats.publicRepos * 12 + 150;
          lastPushStr = githubStats.lastPushStr;
          topLanguage = githubStats.topLanguage;
        }

        setBuffer(prev => [
          ...prev,
          { text: `  GitHub public repos:    ${githubStats?.publicRepos || 20}`, className: "line-green" },
          { text: `  Est. total commits:     ${commits}+`,                         className: "line-green" },
          { text: `  Last push:              ${lastPushStr}`,                      className: "line-green" },
          { text: `  Top language:           ${topLanguage}`,                      className: "line-green" },
          { text: "" }
        ]);
      } catch {
        setBuffer(prev => [
          ...prev,
          { text: "  GitHub API unavailable — showing cached values", className: "line-dim" },
          { text: "  Est. total commits:  348",         className: "line-dim" },
          { text: "  Top language:        TypeScript",  className: "line-dim" },
          { text: "" }
        ]);
      }

      setInputLocked(false);
    }
  };

  const renderPromptPrefix = () => {
    if (phase === "boot")     return "";
    if (phase === "login")    return "ansh-os login: ";
    if (phase === "password") return "Password: ";
    if (phase === "vim")      return ":";
    return "ansh@portfolio:~$ ";
  };

  /* ── BOOT SCREEN ─────────────────────────────────────────── */
  if (phase === "boot") {
    return (
      <div
        className="terminal-screen"
        style={{ justifyContent: "space-between" }}
        aria-label="System boot screen"
        role="main"
      >
        {/* Top header */}
        <div className="boot-header">
          <span>ANSH.OS</span>
          <span>v1.0.0</span>
        </div>

        {/* Main boot content */}
        <div className="boot-body">
          {/* Status indicator */}
          <div className="boot-status-indicator" aria-live="polite" aria-atomic="true">
            <span
              className={`boot-status-dot ${bootComplete ? "boot-status-dot--ready" : "boot-status-dot--booting"}`}
              aria-hidden="true"
            />
            <span>{bootComplete ? "SYSTEM READY" : "BOOTING..."}</span>
          </div>

          {/* ASCII logo */}
          <pre className="boot-ascii-logo" aria-hidden="true">
{` █████╗ ███╗   ██╗███████╗██╗  ██╗
██╔══██╗████╗  ██║██╔════╝██║  ██║
███████║██╔██╗ ██║███████╗███████║
██╔══██║██║╚██╗██║╚════██║██╔══██║
██║  ██║██║ ╚████║███████║██║  ██║
╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝`}
          </pre>

          {/* Boot step lines */}
          <div className="boot-steps" aria-live="polite" role="log" aria-label="Boot progress">
            {BOOT_STEPS.map((line, idx) => {
              if (idx > currentLineIdx) return null;
              return (
                <div key={idx} className="boot-step-line">
                  <span className="boot-step-arrow" aria-hidden="true">▶</span>
                  <span className="boot-step-dollar" aria-hidden="true">$</span>
                  <span className={line.ready ? "boot-step-text--ready" : "boot-step-text--loading"}>
                    {line.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Enter button — shown when boot is complete */}
          {bootComplete && (
            <>
              <div className="boot-divider" aria-hidden="true">
                <div className="boot-divider-line" />
                <div className="boot-divider-dot" />
                <div className="boot-divider-line" />
              </div>

              <button
                className="boot-enter-btn"
                onClick={enterShell}
                onKeyDown={handleBootKeyDown}
                aria-label="Press Enter to access the portfolio terminal"
                id="boot-enter-button"
              >
                [ PRESS ENTER TO ACCESS ]
              </button>
              <p className="boot-hint">Hint: login with guest / guest</p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="boot-footer">
          <span>MUM-IND</span>
          <span>[ SECURE ]</span>
        </div>
      </div>
    );
  }

  /* ── DASHBOARD SCREEN ────────────────────────────────────── */
  if (phase === "dashboard") {
    return (
      <div
        className="dashboard-screen"
        onClick={() => triggerDashboardCommand(null)}
        aria-label="Portfolio dashboard — click or scroll to enter terminal"
        role="main"
      >
        <div className="grid-overlay" aria-hidden="true" />
        <div className="bokeh-container" aria-hidden="true">
          {BOKEH_PARTICLES.map(p => (
            <div
              key={p.id}
              className="bokeh-particle"
              style={{
                width:             p.width,
                height:            p.height,
                left:              p.left,
                top:               p.top,
                animationDelay:    p.animationDelay,
                animationDuration: p.animationDuration,
              }}
            />
          ))}
        </div>

        {/* Top nav */}
        <nav className="dashboard-nav" aria-label="Portfolio navigation">
          <span className="dashboard-nav-brand" aria-label="Ansh Shinde portfolio">ANSH_</span>
          <ul className="dashboard-nav-links" role="list">
            {[
              { label: "[ABOUT]",    cmd: "about"    },
              { label: "[PROJECTS]", cmd: "projects" },
              { label: "[SKILLS]",   cmd: "skills"   },
              { label: "[CONTACT]",  cmd: "contact"  },
            ].map(({ label, cmd }) => (
              <li key={cmd}>
                <button
                  className="nav-link-item"
                  onClick={(e) => { e.stopPropagation(); triggerDashboardCommand(cmd); }}
                  aria-label={`View ${cmd}`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hero */}
        <div className="dashboard-hero">
          <div className="dashboard-online-badge" aria-hidden="true">
            <span className="dashboard-online-dot" />
            <span>ANSH.OS v1.0.0 / ONLINE</span>
          </div>

          <h1 className="dashboard-heading-solid" aria-label="Ansh Shinde">ANSH</h1>
          <h2 className="dashboard-heading-outline" aria-hidden="true">SHINDE</h2>

          <p className="dashboard-roles" aria-label="Full-Stack Developer · Backend Engineer · AI Builder">
            FULL-STACK DEVELOPER  ·  BACKEND ENGINEER  ·  AI BUILDER
          </p>
          <p className="dashboard-location">MUM-IND  ·  B.E. Computer Science</p>

          <div className="dashboard-cta-group">
            <button
              className="btn-cyan-outline"
              id="dashboard-view-work"
              onClick={(e) => { e.stopPropagation(); triggerDashboardCommand(null); }}
              aria-label="Enter terminal to view work"
            >
              [ ENTER TERMINAL ]
            </button>
            <button
              className="btn-link-dim"
              id="dashboard-contact"
              onClick={(e) => { e.stopPropagation(); triggerDashboardCommand("contact"); }}
              aria-label="View contact information"
            >
              GET IN TOUCH →
            </button>
          </div>
        </div>

        <p className="dashboard-footer" aria-hidden="true">
          SCROLL OR CLICK ANYWHERE TO ENTER
        </p>
      </div>
    );
  }

  /* ── SHELL + LOGIN + PASSWORD + VIM ──────────────────────── */
  return (
    <div
      className="terminal-screen"
      onClick={focusInput}
      role="main"
      aria-label="Portfolio terminal"
    >
      {/* Skip link for keyboard users */}
      <a className="skip-link" href="#terminal-input">
        Skip to command input
      </a>

      {/* Output buffer — ARIA live region */}
      <div
        className="terminal-content"
        role="log"
        aria-label="Terminal output"
        aria-live="polite"
        aria-relevant="additions"
        ref={liveRegionRef}
      >
        {buffer.map((line, idx) => {
          if (line.isComponent) {
            return (
              <div key={idx} className="terminal-line-component">
                {line.component}
              </div>
            );
          }
          return (
            <div key={idx} className={`terminal-line ${line.className || ""}`}>
              {line.text}
            </div>
          );
        })}

        {/* Prompt row */}
        {!inputLocked && (
          <div
            className="terminal-input-container"
            id="terminal-input"
          >
            <span className="terminal-prompt" aria-hidden="true">
              {renderPromptPrefix()}
            </span>
            <div className="terminal-input-wrapper">
              {/* Hidden actual input — captures keyboard events */}
              <input
                ref={inputRef}
                id="terminal-command-input"
                type={phase === "password" ? "password" : "text"}
                className="terminal-hidden-input"
                value={phase === "password" ? actualPassword : currentInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label={
                  phase === "login"    ? "Enter username" :
                  phase === "password" ? "Enter password" :
                  phase === "vim"      ? "Vim command input" :
                  "Enter terminal command"
                }
                aria-describedby="terminal-prompt-hint"
              />
              {/* Visible mirrored display */}
              <span className="terminal-display-input" aria-hidden="true">
                {phase === "password" ? passwordMask : currentInput}
                <span className="terminal-cursor" aria-hidden="true" />
              </span>
            </div>
          </div>
        )}

        {/* Screen reader prompt hint */}
        <span id="terminal-prompt-hint" className="sr-only" style={{ position: "absolute", left: "-9999px" }}>
          {phase === "shell"
            ? "Type a command and press Enter. Type 'help' for a list of available commands. Use Tab for autocomplete, arrow keys for history."
            : phase === "vim"
            ? "You are in vim mode. Type :q! and press Enter to exit."
            : "Enter your credentials to log in."}
        </span>

        <div ref={bufferEndRef} />
      </div>
    </div>
  );
}
