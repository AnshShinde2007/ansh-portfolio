// src/terminal/Terminal.jsx
import React, { useState, useEffect, useRef } from "react";
import { getCommandResponse, COMMANDS } from "./commands";
import avatar from "../assets/avatar.png";

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

    const bootLines = [
      { text: "ANSH-OS v1.0.0 — BIOS initiating...", delay: 100 },
      { text: "CPU: Full-Stack · Backend · AI", delay: 250 },
      { text: "RAM: 4 years experience loaded", delay: 400 },
      { text: "Storage: /projects /skills /experience /contact", delay: 600 },
      { text: "", delay: 700 },
      { text: "[████████████████████] 100%", delay: 1100, class: "line-green" },
      { text: "", delay: 1200 },
      { text: "Mounting filesystem...           OK", delay: 1400, class: "line-green" },
      { text: "Loading kernel modules...        OK", delay: 1600, class: "line-green" },
      { text: "Starting network services...     OK", delay: 1800, class: "line-green" },
      { text: "Initializing portfolio daemon... OK", delay: 2000, class: "line-green" },
      { text: "", delay: 2200 },
      { text: "ansh-os login: ", delay: 2500, noNewline: true }
    ];

    bootLines.forEach((line) => {
      setTimeout(() => {
        setBuffer((prev) => {
          if (line.noNewline && prev.length > 0) {
            // Append to the last item if requested, or just add it
            return [...prev, { text: line.text, className: line.class }];
          }
          return [...prev, { text: line.text, className: line.class }];
        });
      }, line.delay);
    });

    setTimeout(() => {
      setPhase("login");
      setInputLocked(false);
    }, 2600);
  }, []);

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
