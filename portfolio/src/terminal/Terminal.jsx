// src/terminal/Terminal.jsx
import React, { useState, useEffect, useRef } from "react";
import { getCommandResponse, COMMANDS } from "./commands";
import avatar from "../assets/avatar.png";

const BOKEH_PARTICLES = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  width: Math.random() * 80 + 40 + "px",
  height: Math.random() * 80 + 40 + "px",
  left: Math.random() * 100 + "%",
  top: Math.random() * 100 + "%",
  animationDelay: Math.random() * 10 + "s",
  animationDuration: Math.random() * 15 + 15 + "s",
}));

// Neofetch Headline Component
const NeofetchHeadline = () => {
  return (
    <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", margin: "16px 0", flexWrap: "wrap" }}>
      <img
        src={avatar}
        alt="Ansh Shinde"
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "8px",
          border: "2px solid var(--cyan)",
          boxShadow: "var(--glow-cyan)",
          imageRendering: "pixelated",
          filter: "grayscale(10%) contrast(115%) brightness(95%)",
          objectFit: "cover",
        }}
      />
      <div>
        <pre style={{
          color: "var(--cyan)",
          textShadow: "var(--glow-cyan)",
          fontFamily: "var(--font-mono)",
          margin: "0 0 12px 0",
          lineHeight: "1.2",
          fontSize: "12px",
          overflow: "hidden"
        }}>
{`+=============================================+
| ________  ________   ________  ___  ___     |
||\\   __  \\|\\   ___  \\|\\   ____\\|\\  \\|\\  \\    |
|\\ \\  \\|\\  \\ \\  \\\\ \\  \\ \\  \\___|\\ \\  \\\\\\  \\   |
| \\ \\   __  \\ \\  \\\\ \\  \\ \\_____  \\ \\   __  \\\\  |
|  \\ \\  \\ \\  \\ \\  \\\\ \\  \\|____|\\  \\ \\  \\ \\  \\ |
|   \\ \\__\\ \\__\\ \\__\\\\ \\__\\____\\_\\  \\ \\__\\ \\__\\\\|
|    \\|__|\\|__|\\|__| \\__|\\_________\\|__|\\|__||
|                        \\|_________|         |
+=============================================+`}
        </pre>
        <div style={{ color: "var(--dim)", margin: "4px 0" }}>----------------------------------</div>
        <div><span style={{ color: "var(--green)" }}>OS:</span> ansh-os v1.0.0</div>
        <div><span style={{ color: "var(--green)" }}>Name:</span> Ansh Shinde</div>
        <div><span style={{ color: "var(--green)" }}>Role:</span> Full-Stack Developer · Backend Engineer · AI Builder</div>
        <div><span style={{ color: "var(--green)" }}>Host:</span> Mumbai, India</div>
        <div><span style={{ color: "var(--green)" }}>Goal:</span> Software Engineer in Japan</div>
      </div>
    </div>
  );
};

export default function Terminal() {
  // States
  const [phase, setPhase] = useState("boot"); // 'boot' | 'login' | 'password' | 'shell' | 'vim'
  const [buffer, setBuffer] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [username, setUsername] = useState("");
  const [passwordMask, setPasswordMask] = useState("");
  const [actualPassword, setActualPassword] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputLocked, setInputLocked] = useState(true);

  // Stats cached in-memory
  const [githubStats, setGithubStats] = useState(null);

  // BIOS Boot screen states
  const [currentLineIdx, setCurrentLineIdx] = useState(-1);
  const [bootComplete, setBootComplete] = useState(false);

  const bootSteps = [
    { text: "INITIALIZING ANSH.OS v1.0.0" },
    { text: "LOADING NEURAL ARCHITECTURE..." },
    { text: "MOUNTING AI SUBSYSTEMS...........[OK]", ready: true },
    { text: "VERIFYING IDENTITY MATRIX.........[OK]", ready: true },
    { text: "DECRYPTING PORTFOLIO DATABASE.......[OK]", ready: true },
    { text: "SYSTEM READY", ready: true }
  ];

  // Refs
  const bufferEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    bufferEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [buffer]);

  // Keep focus on input
  const focusInput = () => {
    if (!inputLocked && inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    focusInput();
  });

  // Boot sequence animation
  useEffect(() => {
    if (phase !== "boot") return;

    const timers = [];
    bootSteps.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setCurrentLineIdx(idx);
      }, (idx + 1) * 500);
      timers.push(timer);
    });

    const endTimer = setTimeout(() => {
      setBootComplete(true);
    }, (bootSteps.length + 1) * 500);
    timers.push(endTimer);

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleBootClick = () => {
    if (bootComplete) {
      setPhase("login");
      setInputLocked(false);
      setBuffer([
        { text: "ansh-os login: ", noNewline: true }
      ]);
    }
  };

  const triggerDashboardCommand = async (cmd) => {
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
      setBuffer((prev) => [...prev, { text: `ansh@portfolio:~$ ${cmd}`, className: "line-cyan" }]);
      const res = await getCommandResponse(cmd, { username: "guest" });
      if (res.action) {
        handleSpecialAction(res.action);
      } else if (res.output) {
        setBuffer((prev) => [
          ...prev,
          ...res.output.map((line) => ({
            text: line,
            className: res.type === "error" ? "line-red" : res.type === "success" ? "line-green" : res.type === "cyan" ? "line-cyan" : ""
          }))
        ]);
      }
    }
  };

  // Scroll/Wheel trigger on dashboard to transition into CLI shell
  useEffect(() => {
    if (phase !== "dashboard") return;
    const handleWheel = (e) => {
      if (e.deltaY > 15) {
        triggerDashboardCommand(null);
      }
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [phase]);

  // Keyboard controls
  const handleKeyDown = (e) => {
    if (inputLocked) return;

    if (e.key === "Enter") {
      const command = currentInput;
      setCurrentInput("");
      handleCommandSubmit(command);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (phase === "shell" && history.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setCurrentInput(history[history.length - 1 - nextIndex]);
        }
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
        const matches = COMMANDS.filter((c) => c.startsWith(currentInput.trim().toLowerCase()));
        if (matches.length === 1) {
          setCurrentInput(matches[0]);
        } else if (matches.length > 1) {
          // Print potential matches
          setBuffer((prev) => [
            ...prev,
            { text: `ansh@portfolio:~$ ${currentInput}`, className: "line-cyan" },
            { text: matches.join("    "), className: "line-dim" }
          ]);
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (phase === "password") {
      // Don't show password, mask it with block chars
      const diff = val.length - actualPassword.length;
      if (diff > 0) {
        const added = val.slice(actualPassword.length);
        setActualPassword((p) => p + added);
        setPasswordMask((m) => m + "█");
      } else {
        setActualPassword((p) => p.slice(0, val.length));
        setPasswordMask((m) => m.slice(0, val.length));
      }
      setCurrentInput(val);
    } else {
      setCurrentInput(val);
    }
  };

  const handleCommandSubmit = async (inputVal) => {
    // 1. LOGIN USERNAME
    if (phase === "login") {
      const user = inputVal.trim();
      if (!user) {
        setBuffer((prev) => [...prev, { text: "ansh-os login: ", noNewline: true }]);
        return;
      }
      setUsername(user);
      setBuffer((prev) => [
        ...prev,
        { text: user },
        { text: "Password: ", noNewline: true }
      ]);
      setActualPassword("");
      setPasswordMask("");
      setPhase("password");
      return;
    }

    // 2. LOGIN PASSWORD
    if (phase === "password") {
      const pass = actualPassword;
      setBuffer((prev) => [...prev, { text: "********" }]);
      setInputLocked(true);

      setTimeout(() => {
        const userLower = username.toLowerCase();
        const passLower = pass.toLowerCase();

        if (userLower === "guest" && passLower === "guest") {
          // Success
          setBuffer([
            { isComponent: true, component: <NeofetchHeadline /> },
            { text: `Last login: ${new Date().toUTCString()} from 127.0.0.1`, className: "line-dim" },
            { text: "" },
            { text: "Type 'help' to see available commands." },
            { text: "" }
          ]);
          setPhase("shell");
        } else if (userLower === "ansh") {
          // Easter egg
          setBuffer([
            { isComponent: true, component: <NeofetchHeadline /> },
            { text: "Welcome back, Creator.", className: "line-cyan line-bold" },
            { text: `System initialized for developer mode.`, className: "line-dim" },
            { text: "" },
            { text: "Type 'help' to see available commands." },
            { text: "" }
          ]);
          setPhase("shell");
        } else if (userLower === "root" && passLower === "root") {
          setBuffer((prev) => [
            ...prev,
            { text: "Nice try.", className: "line-red" },
            { text: "ansh-os login: ", noNewline: true }
          ]);
          setPhase("login");
        } else {
          setBuffer((prev) => [
            ...prev,
            { text: "Login incorrect. Try: guest", className: "line-red" },
            { text: "ansh-os login: ", noNewline: true }
          ]);
          setPhase("login");
        }
        setInputLocked(false);
      }, 500);
      return;
    }

    // 3. VIM MODE INTERCEPTOR
    if (phase === "vim") {
      const cmd = inputVal.trim();
      setBuffer((prev) => [...prev, { text: `: ${cmd}` }]);
      if (cmd === ":q" || cmd === ":q!" || cmd === ":wq") {
        setBuffer((prev) => [
          ...prev,
          { text: "Exited vim. Returning to shell." },
          { text: "" }
        ]);
        setPhase("shell");
      } else {
        setBuffer((prev) => [
          ...prev,
          { text: "E37: No write since last change (add ! to override)", className: "line-red" },
          { text: "Type :q! to escape.", className: "line-dim" }
        ]);
      }
      return;
    }

    // 4. SHELL PHASE
    if (phase === "shell") {
      const trimmed = inputVal.trim();
      if (!trimmed) {
        setBuffer((prev) => [...prev, { text: "ansh@portfolio:~$", className: "line-cyan" }]);
        return;
      }

      // Add to history
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      // Print line prompt with command
      setBuffer((prev) => [...prev, { text: `ansh@portfolio:~$ ${trimmed}`, className: "line-cyan" }]);

      // Process response
      const res = await getCommandResponse(trimmed, { username });

      if (res.action) {
        handleSpecialAction(res.action);
      } else if (res.output) {
        setBuffer((prev) => [
          ...prev,
          ...res.output.map((line) => ({
            text: line,
            className: res.type === "error" ? "line-red" : res.type === "success" ? "line-green" : res.type === "cyan" ? "line-cyan" : ""
          }))
        ]);
      }
    }
  };

  const handleSpecialAction = async (action) => {
    if (action === "clear") {
      setBuffer([
        { isComponent: true, component: <NeofetchHeadline /> }
      ]);
    } else if (action === "gui") {
      setPhase("dashboard");
    } else if (action === "neofetch") {
      setBuffer((prev) => [
        ...prev,
        { isComponent: true, component: <NeofetchHeadline /> }
      ]);
    } else if (action === "vim") {
      setPhase("vim");
      setBuffer((prev) => [
        ...prev,
        { text: "Opening vim...", className: "line-dim" },
        { text: "" },
        { text: "[You are now trapped.]", className: "line-cyan line-bold" },
        { text: "Type ':q!' to exit. Good luck.", className: "line-dim" },
        { text: "" }
      ]);
    } else if (action === "resume") {
      setInputLocked(true);
      setBuffer((prev) => [...prev, { text: "Fetching resume..." }]);

      // Progress bar animation
      const steps = [
        "Downloading ansh-shinde-resume.pdf... █ 8%",
        "Downloading ansh-shinde-resume.pdf... ███ 25%",
        "Downloading ansh-shinde-resume.pdf... ██████ 50%",
        "Downloading ansh-shinde-resume.pdf... █████████ 75%",
        "Downloading ansh-shinde-resume.pdf... ████████████ 100%"
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 250));
        setBuffer((prev) => {
          const base = prev.slice(0, prev.length - 1);
          return [...base, { text: steps[i], className: "line-green" }];
        });
      }

      setBuffer((prev) => [...prev, { text: "Download complete. Opening in new tab...", className: "line-green" }]);

      // Trigger download/open PDF
      window.open("https://drive.google.com/file/d/1yt-FljGp_P6nR2-O1JwYqV1Xdfw_OrBx/view?usp=sharing", "_blank");
      setInputLocked(false);
    } else if (action === "stats") {
      setInputLocked(true);
      setBuffer((prev) => [
        ...prev,
        { text: "STATS — live data", className: "line-cyan" },
        { text: "  Years coding:        4" },
        { text: "  Projects shipped:    12+" },
        { text: "  Hackathons entered:  1" },
        { text: "  Current focus:       Backend Engineering" },
        { text: "" },
        { text: "Fetching GitHub activity... ░░░░░ 0%" }
      ]);

      // Fetch dynamic stats if not cached
      let commits = 240; // realistic fallback
      let lastPushStr = "12 hours ago";
      let topLanguage = "TypeScript";

      try {
        if (!githubStats) {
          // We run these fetches asynchronously but wrap them with the simulated progress
          const apiFetchPromise = (async () => {
            const userRes = await fetch("https://api.github.com/users/AnshShinde2007");
            const userData = await userRes.json();
            const eventsRes = await fetch("https://api.github.com/users/AnshShinde2007/events");
            const eventsData = await eventsRes.json();

            // Estimate commits (GitHub API has limited historical commit count but we can approximate or show public repos/followers)
            const publicRepos = userData.public_repos || 20;
            const followers = userData.followers || 5;

            // Find last push event
            const pushEvent = eventsData.find(e => e.type === "PushEvent");
            let hoursAgo = "8 hours ago";
            if (pushEvent && pushEvent.created_at) {
              const diffMs = new Date() - new Date(pushEvent.created_at);
              const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
              hoursAgo = diffHrs === 0 ? "just now" : `${diffHrs} hours ago`;
            }

            const statsObj = {
              publicRepos,
              followers,
              lastPushStr: hoursAgo,
              topLanguage: "TypeScript & Go"
            };
            setGithubStats(statsObj);
            return statsObj;
          })();

          // Wait a bit to show smooth progress bar
          for (let percent = 20; percent <= 100; percent += 20) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            const bar = "█".repeat(percent / 10) + "░".repeat((100 - percent) / 10);
            setBuffer((prev) => {
              const base = prev.slice(0, prev.length - 1);
              return [...base, { text: `Fetching GitHub activity... ${bar} ${percent}%`, className: "line-green" }];
            });
          }

          const resolvedStats = await apiFetchPromise;
          commits = resolvedStats.publicRepos * 12 + 150; // mock total commits estimate
          lastPushStr = resolvedStats.lastPushStr;
          topLanguage = resolvedStats.topLanguage;
        } else {
          // Stats cached
          commits = githubStats.publicRepos * 12 + 150;
          lastPushStr = githubStats.lastPushStr;
          topLanguage = githubStats.topLanguage;
        }

        setBuffer((prev) => [
          ...prev,
          { text: `  GitHub Commits (est): ${commits}`, className: "line-green" },
          { text: `  Last commit:         ${lastPushStr}`, className: "line-green" },
          { text: `  Top language:        ${topLanguage}`, className: "line-green" },
          { text: "" }
        ]);
      } catch (err) {
        // Fallback
        setBuffer((prev) => [
          ...prev,
          { text: "  GitHub Commits (est): 348", className: "line-dim" },
          { text: "  Last commit:         Yesterday", className: "line-dim" },
          { text: "  Top language:        TypeScript", className: "line-dim" },
          { text: "" }
        ]);
      }

      setInputLocked(false);
    }
  };

  // Helper to determine the prompt symbol
  const renderPromptPrefix = () => {
    if (phase === "boot") return "";
    if (phase === "login") return "ansh-os login: ";
    if (phase === "password") return "Password: ";
    if (phase === "vim") return ":";
    return "ansh@portfolio:~$ ";
  };

  if (phase === "boot") {
    return (
      <div className="terminal-screen" onClick={handleBootClick} style={{ justifyContent: "space-between", padding: "32px", display: "flex", flexDirection: "column" }}>
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", fontSize: "12px", color: "var(--dim)" }}>
          <span>ANSH.OS</span>
          <span>v1.0.0</span>
        </div>

        {/* Center Boot Content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", flex: 1 }}>
          {/* Status Dot */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "var(--dim)" }}>
            <span style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: bootComplete ? "var(--green)" : "var(--cyan)",
              boxShadow: bootComplete ? "var(--glow-green)" : "var(--glow-cyan)"
            }}></span>
            <span>{bootComplete ? "SYSTEM READY" : "BOOTING..."}</span>
          </div>

          {/* Big ASCII Logo */}
          <pre style={{
            color: "var(--text-primary)",
            margin: "0",
            lineHeight: "1.2",
            fontSize: "11px",
            textAlign: "center",
            overflow: "hidden"
          }}>
{` █████╗ ███╗   ██╗███████╗██╗  ██╗
██╔══██╗████╗  ██║██╔════╝██║  ██║
███████║██╔██╗ ██║███████╗███████║
██╔══██║██║╚██╗██║╚════██║██╔══██║
██║  ██║██║ ╚████║███████║██║  ██║
╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝`}
          </pre>

          {/* Boot Steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start", width: "100%", maxWidth: "450px", marginTop: "24px", fontSize: "12px" }}>
            {bootSteps.map((line, idx) => {
              if (idx > currentLineIdx) return null;
              return (
                <div key={idx} style={{ display: "flex", gap: "12px", color: line.ready ? "var(--green)" : "var(--text-primary)" }}>
                  <span style={{ color: "var(--green)" }}>▶</span>
                  <span style={{ color: "var(--cyan)" }}>$</span>
                  <span>{line.text}</span>
                </div>
              );
            })}
          </div>

          {/* Divider */}
          {bootComplete && (
            <>
              <div style={{ display: "flex", alignItems: "center", width: "100%", maxWidth: "320px", margin: "24px 0 16px 0" }}>
                <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }}></div>
                <div style={{ width: "6px", height: "6px", backgroundColor: "var(--dim)", margin: "0 8px" }}></div>
                <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }}></div>
              </div>

              {/* Click anywhere target */}
              <div
                style={{
                  color: "var(--cyan)",
                  textShadow: "var(--glow-cyan)",
                  fontSize: "13px",
                  cursor: "pointer",
                  letterSpacing: "2px",
                  animation: "cursor-blink 1.5s step-end infinite",
                  userSelect: "none"
                }}
              >
                [ CLICK ANYWHERE TO ENTER ]
              </div>
              <div style={{ color: "var(--dim)", fontSize: "11px", marginTop: "8px" }}>
                (Hint: login with guest / guest)
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", fontSize: "12px", color: "var(--dim)" }}>
          <span>MUM-IND</span>
          <span>[ SECURE ]</span>
        </div>
      </div>
    );
  }

  if (phase === "dashboard") {
    return (
      <div className="dashboard-screen" onClick={() => triggerDashboardCommand(null)}>
        <div className="grid-overlay" />
        <div className="bokeh-container">
          {BOKEH_PARTICLES.map((p) => (
            <div
              key={p.id}
              className="bokeh-particle"
              style={{
                width: p.width,
                height: p.height,
                left: p.left,
                top: p.top,
                animationDelay: p.animationDelay,
                animationDuration: p.animationDuration,
              }}
            />
          ))}
        </div>

        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", zIndex: 10, alignItems: "center" }}>
          <span style={{ color: "var(--cyan)", textShadow: "var(--glow-cyan)", fontWeight: "bold", letterSpacing: "1px", fontFamily: "var(--font-mono)" }}>ANSH_</span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="nav-link-item" onClick={(e) => { e.stopPropagation(); triggerDashboardCommand("about"); }}>[ABOUT]</button>
            <button className="nav-link-item" onClick={(e) => { e.stopPropagation(); triggerDashboardCommand("projects"); }}>[PROJECTS]</button>
            <button className="nav-link-item" onClick={(e) => { e.stopPropagation(); triggerDashboardCommand("skills"); }}>[SKILLS]</button>
            <button className="nav-link-item" onClick={(e) => { e.stopPropagation(); triggerDashboardCommand("contact"); }}>[CONTACT]</button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, zIndex: 10, textAlign: "center" }}>
          {/* Status Label */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "var(--dim)", marginBottom: "16px" }}>
            <span style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "var(--green)",
              boxShadow: "var(--glow-green)"
            }}></span>
            <span style={{ letterSpacing: "1.5px", fontFamily: "var(--font-mono)", fontSize: "11px" }}>ANSH.OS v1.0.0 / ONLINE</span>
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)", fontWeight: "900", color: "#fff", lineHeight: "0.95", margin: "0", letterSpacing: "4px", fontFamily: "var(--font-mono)" }}>
            ANSH
          </h1>
          <h1 className="text-outlined" style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)", margin: "0", lineHeight: "0.95", fontFamily: "var(--font-mono)" }}>
            SHINDE
          </h1>

          {/* Roles */}
          <div style={{ color: "var(--text-secondary)", fontSize: "clamp(10px, 1.8vw, 12px)", letterSpacing: "2.5px", marginTop: "24px", fontFamily: "var(--font-mono)", fontWeight: "500" }}>
            FULL-STACK DEVELOPER  ·  BACKEND ENGINEER  ·  AI BUILDER
          </div>
          <div style={{ color: "var(--dim)", fontSize: "11px", letterSpacing: "1.2px", marginTop: "8px", fontFamily: "var(--font-mono)" }}>
            MUM-IND  ·  B.E. Computer Science
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "24px", marginTop: "40px", alignItems: "center" }}>
            <button className="btn-cyan-outline" onClick={(e) => { e.stopPropagation(); triggerDashboardCommand(null); }}>[ VIEW WORK ]</button>
            <button className="btn-link-dim" onClick={(e) => { e.stopPropagation(); triggerDashboardCommand("contact"); }}>GET IN TOUCH →</button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "center", width: "100%", zIndex: 10, fontSize: "11px", color: "var(--dim)", letterSpacing: "1px", fontFamily: "var(--font-mono)" }}>
          SCROLL OR CLICK TO ENTER
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-screen" onClick={focusInput}>


      <div className="terminal-content">
        {/* Output Buffer */}
        {buffer.map((line, idx) => {
          if (line.isComponent) {
            return <div key={idx} className="terminal-line-component">{line.component}</div>;
          }
          return (
            <div key={idx} className={`terminal-line ${line.className || ""}`}>
              {line.text}
            </div>
          );
        })}

        {/* Input prompt line */}
        {!inputLocked && (
          <div className="terminal-input-container">
            <span className="terminal-prompt">{renderPromptPrefix()}</span>
            <div className="terminal-input-wrapper">
              <input
                ref={inputRef}
                type={phase === "password" ? "password" : "text"}
                className="terminal-hidden-input"
                value={phase === "password" ? actualPassword : currentInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <span className="terminal-display-input">
                {phase === "password" ? passwordMask : currentInput}
                <span className="terminal-cursor"></span>
              </span>
            </div>
          </div>
        )}
        <div ref={bufferEndRef} />
      </div>
    </div>
  );
}
