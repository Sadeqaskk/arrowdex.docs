"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps any content and reveals it (fade + slide + slight blur-out) the
 * moment it scrolls into view, instead of animating once on page load.
 * This is the "scroll storytelling" pattern used across most premium
 * 2026 sites — content should feel like it's responding to the user's
 * scroll, not just replaying a fixed intro animation.
 *
 * Usage: <Reveal delay={80}><YourSection /></Reveal>
 * Usage: <Reveal direction="left"><YourSection /></Reveal>
 */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenTransform =
    direction === "left"
      ? "translateX(-26px) scale(0.99)"
      : direction === "right"
      ? "translateX(26px) scale(0.99)"
      : "translateY(22px) scale(0.99)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0, 0) scale(1)" : hiddenTransform,
        filter: visible ? "blur(0px)" : "blur(6px)",
        transition:
          "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.8s cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}