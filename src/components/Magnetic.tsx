"use client";

import { useRef } from "react";

/**
 * Wraps a button/link and gives it a subtle "magnetic" pull toward the
 * cursor when hovered — a small, tactile micro-interaction that reads as
 * premium without being gimmicky. Strength is capped low on purpose.
 *
 * Usage: <Magnetic><button>Connect Wallet</button></Magnetic>
 */
export default function Magnetic({
  children,
  strength = 14,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
  }

  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-block transition-transform duration-200 ease-out"
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}