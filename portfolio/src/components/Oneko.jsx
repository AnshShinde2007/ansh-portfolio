// src/components/Oneko.jsx
// Adapted from https://github.com/adryd325/oneko.js (MIT License)
// Wrapped in a React useEffect so it runs once at root mount and
// cleans up properly when the component unmounts (avoids duplicate pets in SPA).

import { useEffect } from "react";

export default function Oneko() {
  useEffect(() => {
    // Respect prefers-reduced-motion
    const isReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches === true;
    if (isReducedMotion) return;

    // Skip on touch-only devices (no persistent cursor to chase)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    // ─── Sprite map ────────────────────────────────────────────────────────────
    const spriteSets = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
      scratchWallN: [[0, 0], [0, -1]],
      scratchWallS: [[-7, -1], [-6, -2]],
      scratchWallE: [[-2, -2], [-2, -3]],
      scratchWallW: [[-4, 0], [-4, -1]],
      tired: [[-3, -2]],
      sleeping: [[-2, 0], [-2, -1]],
      N: [[-1, -2], [-1, -3]],
      NE: [[0, -2], [0, -3]],
      E: [[-3, 0], [-3, -1]],
      SE: [[-5, -1], [-5, -2]],
      S: [[-6, -3], [-7, -2]],
      SW: [[-5, -3], [-6, -1]],
      W: [[-4, -2], [-4, -3]],
      NW: [[-1, 0], [-1, -1]],
    };

    // ─── State ─────────────────────────────────────────────────────────────────
    let nekoPosX = 32;
    let nekoPosY = 32;
    let mousePosX = 0;
    let mousePosY = 0;

    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation = null;
    let idleAnimationFrame = 0;
    const nekoSpeed = 22;

    let isPetted = false;
    let pettedFrame = 0;

    // ─── DOM element ───────────────────────────────────────────────────────────
    const nekoEl = document.createElement("div");
    nekoEl.id = "oneko";
    nekoEl.style.cssText = [
      "width: 32px",
      "height: 32px",
      "position: fixed",
      "pointer-events: auto",
      "cursor: pointer",
      "image-rendering: pixelated",
      "left: 16px",
      "top: 16px",
      "z-index: 9999",
      `background-image: url('/oneko.gif')`,
    ].join(";");
    document.body.appendChild(nekoEl);

    // ─── Helpers ───────────────────────────────────────────────────────────────
    function setSprite(name, frame) {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }

    // ─── Heart burst ───────────────────────────────────────────────────────────
    function spawnHearts() {
      for (let i = 0; i < 3; i++) {
        const heart = document.createElement("div");
        heart.textContent = "♥";
        heart.style.cssText = [
          `position: fixed`,
          `left: ${nekoPosX - 8 + i * 10}px`,
          `top: ${nekoPosY - 24}px`,
          `color: #ff6b9c`,
          `font-size: 13px`,
          `pointer-events: none`,
          `z-index: 10000`,
          `transition: transform 0.6s ease-out, opacity 0.6s ease-out`,
        ].join(";");
        document.body.appendChild(heart);
        requestAnimationFrame(() => {
          heart.style.transform = `translateY(-${20 + i * 6}px) rotate(${(i - 1) * 15}deg)`;
          heart.style.opacity = "0";
        });
        setTimeout(() => heart.remove(), 650);
      }
    }

    // ─── Trail afterimage ──────────────────────────────────────────────────────
    function spawnTrail() {
      const ghost = nekoEl.cloneNode(false);
      ghost.style.zIndex = "9998";
      ghost.style.transition = "opacity 0.25s linear, transform 0.25s linear";
      ghost.style.opacity = "0.35";
      document.body.appendChild(ghost);
      requestAnimationFrame(() => {
        ghost.style.opacity = "0";
        ghost.style.transform = "scale(0.85)";
      });
      setTimeout(() => ghost.remove(), 260);
    }

    function idle() {
      idleTime += 1;

      // After 5s idle, occasionally play a special animation
      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) === 0 &&
        idleAnimation === null
      ) {
        const availableIdleAnimations = ["sleeping", "scratchSelf"];
        if (nekoPosX < 32) availableIdleAnimations.push("scratchWallW");
        if (nekoPosY < 32) availableIdleAnimations.push("scratchWallN");
        if (nekoPosX > window.innerWidth - 32) availableIdleAnimations.push("scratchWallE");
        if (nekoPosY > window.innerHeight - 32) availableIdleAnimations.push("scratchWallS");
        idleAnimation =
          availableIdleAnimations[
          Math.floor(Math.random() * availableIdleAnimations.length)
          ];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) resetIdleAnimation();
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) resetIdleAnimation();
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }

    // ─── Main frame loop ───────────────────────────────────────────────────────
    function frame() {
      frameCount += 1;

      // Petting overrides all other behaviour
      if (isPetted) {
        setSprite("scratchSelf", Math.floor(pettedFrame / 6));
        pettedFrame += 1;
        if (pettedFrame > 60) isPetted = false;
        return;
      }

      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < nekoSpeed || distance < 48) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;
      idleTime = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 0);
        return;
      }

      // Direction
      let direction = "";
      direction += diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";

      setSprite(direction, Math.floor(frameCount / 2));

      // Spawn a fading ghost every 3rd frame while chasing
      if (frameCount % 3 === 0 && distance > 48) {
        spawnTrail();
      }

      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;

      // Clamp to viewport
      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    }

    // ─── Event listeners ───────────────────────────────────────────────────────
    function onMouseMove(e) {
      mousePosX = e.clientX;
      mousePosY = e.clientY;
    }

    document.addEventListener("mousemove", onMouseMove);

    function onClick() {
      isPetted = true;
      pettedFrame = 0;
      spawnHearts();
    }
    nekoEl.addEventListener("click", onClick);

    // ─── rAF loop ──────────────────────────────────────────────────────────────
    // Throttle logic calls to ~10 fps (matches original feel) while letting
    // the browser schedule the actual check at 60+ fps for buttery smoothness.
    let rafId;
    let lastTick = 0;
    const TICK_MS = 100; // logic update rate

    function loop(now) {
      rafId = requestAnimationFrame(loop);
      if (now - lastTick >= TICK_MS) {
        lastTick = now;
        frame();
      }
    }
    rafId = requestAnimationFrame(loop);

    // ─── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      nekoEl.removeEventListener("click", onClick);
      if (nekoEl.parentNode) nekoEl.parentNode.removeChild(nekoEl);
    };
  }, []); // empty deps → runs once on mount, cleans up on unmount

  return null; // renders nothing into the React tree
}
