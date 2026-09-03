# Design System — Ansh Shinde · Full-Stack Developer & Software Engineer

> **Design intent**: A developer portfolio disguised as a terminal operating system. The medium signals engineering thinking. The content proves it.

---

## 1. Context and Goals

**Product:** Ansh Shinde – Full Stack Developer & Software Engineer portfolio  
**URL:** anshshinde.dev  
**Surface:** Developer portfolio and content site (terminal-based)  
**Audiences:** Technical recruiters, engineering hiring managers, potential collaborators, developers  

**Goal:** Present Ansh's engineering work — projects, architecture decisions, outcomes — through a terminal-OS interface that itself demonstrates systems-level thinking.

**Not the goal:** Decorative animations, vague "passionate developer" copy, or generic portfolio templates.

---

## 2. Design Tokens and Foundations

All components reference semantic tokens. No raw values inside components.

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--color-surface-base` | `#020408` | Page background |
| `--color-surface-raised` | `#0a1020` | Panels, cards |
| `--color-surface-overlay` | `rgba(10,16,32,0.90)` | Modal/overlay |
| `--color-border-default` | `#1a2a3a` | Card outlines, dividers |
| `--color-border-muted` | `rgba(26,42,58,0.50)` | Subtle separators |
| `--color-text-primary` | `#c8d8e8` | Body text — 7.1:1 contrast on surface-base ✓ |
| `--color-text-secondary` | `#5a7a9a` | Labels, metadata — 4.6:1 contrast ✓ |
| `--color-text-dim` | `#3a4a5c` | Decorative chars, timestamps |
| `--color-text-inverse` | `#020408` | Text on bright backgrounds |
| `--color-accent-cyan` | `#00e5ff` | Prompt, links, cursor, active highlights |
| `--color-accent-green` | `#00ff9d` | Success output, ls listings |
| `--color-accent-red` | `#ff6b6b` | Errors |
| `--color-accent-yellow` | `#ffd166` | Warnings |
| `--color-focus-ring` | `#00e5ff` | Focus indicator |

**Contrast verification (WCAG AA):**
- `--color-text-primary` (#c8d8e8) on `--color-surface-base` (#020408): **7.1:1** ✓ passes AA + AAA
- `--color-text-secondary` (#5a7a9a) on `--color-surface-base` (#020408): **4.6:1** ✓ passes AA
- `--color-accent-cyan` (#00e5ff) on `--color-surface-base` (#020408): **12.3:1** ✓ passes AA + AAA

### Typography Tokens

| Token | Value |
|---|---|
| `--font-mono` | `'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'SF Mono', monospace` |
| `--font-size-base` | `14px` |
| `--font-size-sm` | `12px` |
| `--font-size-xs` | `11px` |
| `--font-size-lg` | `16px` |
| `--font-size-xl` | `18px` |
| `--font-size-2xl` | `clamp(2.5rem, 7vw, 5.5rem)` |
| `--line-height-base` | `1.65` |
| `--line-height-tight` | `1.2` |

**Rule:** Monospace everywhere. No exceptions. No serif or sans-serif fonts.

### Spacing Tokens

| Token | Value |
|---|---|
| `--space-1` | `2px` |
| `--space-2` | `4px` |
| `--space-3` | `6px` |
| `--space-4` | `8px` |
| `--space-5` | `12px` |
| `--space-6` | `16px` |
| `--space-7` | `24px` |
| `--space-8` | `32px` |
| `--space-9` | `48px` |
| `--space-10` | `64px` |

### Radius Tokens

| Token | Value |
|---|---|
| `--radius-xs` | `2px` |
| `--radius-sm` | `4px` |
| `--radius-md` | `8px` |
| `--radius-full` | `9999px` |

### Motion Tokens

| Token | Value |
|---|---|
| `--motion-instant` | `180ms` |
| `--motion-fast` | `240ms` |
| `--motion-medium` | `360ms` |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |

**Rule:** All motion must have `prefers-reduced-motion: reduce` fallback. When reduced, durations collapse to 0.01ms.

### Glow Tokens (phosphor effect)

| Token | Value |
|---|---|
| `--glow-cyan` | `0 0 8px #00e5ff, 0 0 20px rgba(0,229,255,0.30)` |
| `--glow-green` | `0 0 8px #00ff9d, 0 0 16px rgba(0,255,157,0.20)` |
| `--glow-red` | `0 0 8px rgba(255,107,107,0.50)` |

---

## 3. Component-Level Rules

### 3.1 Terminal Screen

**Anatomy:**
- Fixed-position container covering full viewport
- CRT scanline overlay (CSS `::before`, `pointer-events: none`, `z-index: 999`)
- Output buffer (scrollable, `aria-live="polite"`)
- Input row (prompt + hidden input + visible display mirror + cursor)

**States:**
| State | Behavior |
|---|---|
| `boot` | Animated step-by-step boot sequence, no input |
| `login` | Username prompt, input unlocked |
| `password` | Password prompt, masked display with `type="password"` |
| `shell` | Full command shell, history, tab complete |
| `vim` | Vim intercept mode, only vim commands accepted |
| `dashboard` | Landing hero, click/scroll enters shell |

**Keyboard behavior:**
- `Enter`: Submit command
- `↑ / ↓`: Navigate command history
- `Tab`: Autocomplete from known command list
- `Ctrl+C`: Cancel current input
- `Ctrl+L`: Clear buffer (same as `clear` command)
- `Enter / Space` on boot button: Enter shell
- `Shift+Tab`: Focus previous interactive element

**Overflow:** `white-space: pre-wrap; word-break: break-word` on all output lines. No horizontal overflow.

**Mobile:** At ≤600px, `--terminal-padding` reduces to 16px, font-size to 13px.

**Empty state:** Terminal always shows prompt line. Empty buffer shows only prompt.

**Error state:** `line-red` class applied. Message always includes corrective action (e.g., "type 'help'").

---

### 3.2 Boot Screen

**Anatomy:**
- Header: OS name + version
- Body: Status indicator + ASCII logo + step lines + enter button
- Footer: Location + status badge

**States:**
| State | Behavior |
|---|---|
| Default (booting) | Steps appear progressively at 500ms intervals |
| Complete | Green status dot, enter button appears with blink animation |
| Reduced motion | All steps shown instantly, no blink animation |

**Enter button (`.boot-enter-btn`):**
- Semantic `<button>` — not a `<div>`
- `min-height: 44px` (touch target)
- Responds to `Enter`, `Space`, and click
- `aria-label="Press Enter to access the portfolio terminal"`
- `focus-visible` ring: 2px solid `--color-focus-ring`, offset 3px

**Accessibility:**
- `aria-live="polite"` on step list and status indicator
- ASCII logo: `aria-hidden="true"`
- Step list: `role="log"`

---

### 3.3 Dashboard Screen

**Anatomy:**
- Background: grid overlay + bokeh ambient particles (aria-hidden)
- Nav: brand + 4 nav buttons
- Hero: online badge + heading + roles + CTA group
- Footer: scroll hint

**States:**
| State | Behavior |
|---|---|
| Default | Particles animate (no prefers-reduced-motion), cursor blink on enter button |
| Reduced motion | No particle animation, no button blink |
| Hover (nav buttons) | `--color-accent-cyan` text, glow |
| Active (nav buttons) | `--color-text-primary` |
| Focus-visible | 2px solid focus ring |

**Nav buttons:**
- `min-height: 44px`, `min-width: 44px`
- `role="navigation"` on `<nav>`
- `aria-label` describing destination on each button

**Headings:**
- `<h1>` for "ANSH" (with aria-label="Ansh Shinde")
- `<h2>` for "SHINDE" (aria-hidden — decorative)

**Click/scroll interaction:**
- Any click on the dashboard (outside nav buttons) enters shell
- Scroll down (deltaY > 15) enters shell
- Nav buttons stop propagation and run specific command

---

### 3.4 Command Output Lines

**Anatomy:** `<div class="terminal-line [modifier]">`

**Modifier classes:**
| Class | Color token | Usage |
|---|---|---|
| `.line-cyan` | `--color-accent-cyan` | Prompts, commands typed |
| `.line-green` | `--color-accent-green` | Success output, ls |
| `.line-red` | `--color-accent-red` | Errors |
| `.line-dim` | `--color-text-dim` | Timestamps, decorative |
| `.line-secondary` | `--color-text-secondary` | Metadata |
| `.line-bold` | — | Font-weight: 700 |

**Overflow:** `pre-wrap` + `break-word`. Long URLs wrap. Box-drawing characters preserved.

**Loading state:** Inline progress bar updated via React state (no CSS animation needed).

---

### 3.5 Input Row

**Anatomy:**
```
[prompt] [hidden-input (opacity:0)] [display-mirror] [cursor blink]
```

**Hidden input:** `type="password"` when in password phase; `type="text"` otherwise. Has `aria-label`.

**Display mirror:** `pointer-events: none`, `aria-hidden="true"`. Mirrors hidden input value.

**Cursor:** 8×1.1em block, `background: --color-accent-cyan`, animates blink. `aria-hidden="true"`.

**Touch target:** The containing `.terminal-screen` captures clicks and re-focuses the input.

---

### 3.6 Buttons (all interactive elements)

Every button must define:

| State | Implementation |
|---|---|
| Default | Color from token, no background |
| Hover | Adjusted color/glow via `transition` |
| Focus-visible | 2px solid `--color-focus-ring`, offset 3px |
| Active | Slightly brighter or inverse |
| Disabled | `opacity: 0.55`, `cursor: not-allowed` |
| Loading | Text changes, button disabled |

**Touch target:** All buttons: `min-height: 44px`, `min-width: 44px`.

**Labels:** All buttons have descriptive `aria-label` when label text is ambiguous (e.g., `[ VIEW WORK ]`).

---

## 4. Accessibility Requirements

### Testable Acceptance Criteria

| # | Criterion | Pass check | Fail check |
|---|---|---|---|
| A1 | All interactive controls reachable by Tab | Tab reaches every button and input | Any button/input unreachable |
| A2 | Focus order matches visual reading order | Focus moves top→bottom, left→right | Focus jumps unexpectedly |
| A3 | Focus-visible clearly visible | 2px cyan ring visible against dark background | No ring, or ring hidden |
| A4 | Buttons respond to Enter and Space | Boot button opens shell on Space | Space does nothing |
| A5 | Links activate on Enter | Terminal links open on Enter | Enter does nothing |
| A6 | Touch targets ≥ 44×44px | All buttons pass | Any button < 44px |
| A7 | Normal text ≥ 4.5:1 contrast | #c8d8e8 on #020408 = 7.1:1 | Any text < 4.5:1 |
| A8 | Large text ≥ 3:1 contrast | All large headings verified | Any heading < 3:1 |
| A9 | 200% zoom usable | No horizontal overflow, no content loss | Overflow or clipped content |
| A10 | Reduced-motion respected | Boot animation instant at reduced-motion OS setting | Animation still plays |
| A11 | Images have alt text | avatar.png has alt="Ansh Shinde — Full-Stack Developer" | Empty alt on informational image |
| A12 | Decorative images aria-hidden | ASCII art: `aria-hidden="true"` | Decorative art read by screen reader |
| A13 | ARIA live region on output | `aria-live="polite"` on `.terminal-content` | New output not announced |
| A14 | Form errors identified | Login error names the field and correction | "Error occurred" without detail |

---

## 5. Content Standards

### Writing Tone
Concise, technical, confident. Every piece of copy prioritizes:
1. What was built
2. How it works (engineering decisions)
3. Measurable outcomes

### Project Description Format
```
Problem: [what was broken or missing]
Engineering approach: [how it was solved, what decisions were made]
Stack: [specific technologies with versions where relevant]
Result: [measurable outcome]
```

### Approved examples

> Built an OTLP-compatible observability platform for AI agents. FastAPI ingests trace spans, detects anomalies, and auto-retries failing steps with exponential backoff. Next.js dashboard surfaces cost totals, P95 latency, and span waterfall views.

> Built a URL shortener demonstrating distributed systems design: Redis-backed redirect cache with sub-10ms lookups, sliding window rate limiting per user token, and fire-and-forget analytics writes to prevent write contention.

### Prohibited language
- "passionate developer"
- "innovative solutions"  
- "hard-working"
- "team player"
- "amazing project using modern technologies"

---

## 6. Anti-Patterns and Prohibited Implementations

| Anti-pattern | Correct approach |
|---|---|
| Raw color in JSX: `color: "#00e5ff"` | Use CSS class: `className="line-cyan"` |
| `<div onClick>` for buttons | Use `<button>` with proper semantics |
| Inline spacing: `margin: "24px"` | Use `var(--space-7)` via className |
| Hover-only information reveal | Information always visible; hover adds emphasis |
| Motion required to understand content | All content visible without animation |
| Missing empty/error states | Every command output handles edge cases |
| Vague button labels: `[ DO THING ]` | Descriptive: `aria-label="Enter terminal to view projects"` |
| Shrunk desktop layout on mobile | Dedicated mobile styles, reduced padding, font-size |
| Arbitrary spacing exception | Map to nearest spacing token |
| Low-contrast dim text for important content | Dim text only for decorative/secondary elements |
| Hidden focus indicators | focus-visible ring always present and visible |

---

## 7. QA Checklist

Before shipping any change:

- [ ] Semantic tokens used consistently — no raw values in JSX or component CSS
- [ ] No unnecessary one-off visual values
- [ ] All component states implemented (default, hover, focus-visible, active, disabled)
- [ ] Keyboard navigation works: boot → login → shell full flow
- [ ] Tab cycles through all nav buttons and CTAs
- [ ] Enter/Space both trigger boot enter button
- [ ] Focus-visible ring clearly visible on all interactive elements
- [ ] WCAG AA contrast verified for all text/background pairs
- [ ] Mobile layout (375px): no horizontal overflow, readable text, usable touch targets
- [ ] 200% browser zoom: no content loss or horizontal scroll
- [ ] OS-level reduced-motion: boot animation instant, cursor not blinking
- [ ] All 5 projects accessible via `project [1–5]`
- [ ] All project descriptions follow Problem → Engineering approach → Stack → Result
- [ ] `experience [1–3]` shows concrete outcomes, no vague copy
- [ ] `contact` output includes all channels and `open` command usage
- [ ] `help` output includes easter eggs section
- [ ] GitHub API fetch has fallback on network error
- [ ] Resume command shows animated progress then opens PDF
- [ ] External links open in `_blank` with `noopener,noreferrer`
- [ ] ASCII art elements carry `aria-hidden="true"`
- [ ] avatar.png has descriptive alt text
- [ ] aria-live region on terminal output buffer
- [ ] Screen reader prompt hint updates per phase
- [ ] Admin routes (/admin, /admin-login) unaffected by changes
- [ ] No console errors on first load
- [ ] No TypeScript/ESLint warnings in terminal components