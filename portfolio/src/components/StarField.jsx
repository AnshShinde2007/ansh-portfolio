// src/components/StarField.jsx
import { useEffect, useRef } from "react";

const STAR_COUNT = 180;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function generateStars() {
  return Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    x: randomBetween(0, 100),
    y: randomBetween(0, 100),
    size: randomBetween(0.8, 2.4),
    opacity: randomBetween(0.15, 0.75),
    delay: randomBetween(0, 6),
    duration: randomBetween(2.5, 6),
  }));
}

const STARS = generateStars();

export default function StarField() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY * 0.08;
        el.style.transform = `translateY(${y}px)`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="starfield"
      aria-hidden="true"
      role="presentation"
    >
      {STARS.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
