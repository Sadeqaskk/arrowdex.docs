"use client";

import { useRef } from "react";
import Stamp from "./Stamp";

const TILT_MAX_DEG = 6;

export default function FeatureCard({
  title,
  description,
  contract,
  icon,
  size = "normal",
  variant = "default",
}: {
  title: string;
  description: string;
  contract: string;
  icon: React.ReactNode;
  size?: "normal" | "large";
  variant?: "default" | "signature";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isSignature = variant === "signature";

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * TILT_MAX_DEG).toFixed(2)}deg) rotateY(${(px * TILT_MAX_DEG).toFixed(2)}deg) translateY(-4px)`;
    el.style.setProperty("--glow-x", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--glow-y", `${(py + 0.5) * 100}%`);
  }

  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`tilt-card group relative overflow-hidden rounded-[20px] border p-8 transition-[border-color,box-shadow] duration-300 ${
        isSignature
          ? "border-brass-dim bg-ink-panel hover:shadow-[0_24px_70px_-18px_rgba(155,140,255,0.45)]"
          : "border-hairline bg-ink-raised hover:border-brass-dim hover:shadow-[0_20px_60px_-15px_rgba(155,140,255,0.35)]"
      } ${size === "large" ? "sm:col-span-2" : ""}`}
      style={{ transform: "perspective(900px) rotateX(0deg) rotateY(0deg)" }}
    >
      {/* Animated shimmer accent along the top edge — subtle, always-on
          motion that signals "live" without competing with the hover glow.
          Signature cards get a slightly brighter, wider shimmer. */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px ${isSignature ? "opacity-100" : "opacity-70"}`}
        style={{
          background: isSignature
            ? "linear-gradient(90deg, transparent, rgba(155,140,255,0.9), rgba(176,87,232,0.7), rgba(124,156,255,0.6), transparent)"
            : "linear-gradient(90deg, transparent, rgba(155,140,255,0.7), rgba(176,87,232,0.5), transparent)",
          backgroundSize: "200% 100%",
        }}
      >
        <div className="h-full w-full animate-shimmer" style={{ backgroundImage: "inherit", backgroundSize: "inherit" }} />
      </div>

      {/* Signature cards additionally get a slow ambient mesh wash —
          reuses the same gradient tokens as the site's CTA sections,
          not a new color. */}
      {isSignature && (
        <div
          className="pointer-events-none absolute inset-0 opacity-60 animate-meshShift"
          style={{
            background:
              "radial-gradient(ellipse 420px 260px at 15% 10%, rgba(155,140,255,0.12), transparent 60%), radial-gradient(ellipse 360px 260px at 85% 90%, rgba(176,87,232,0.09), transparent 60%)",
          }}
        />
      )}

      {/* Cursor-following glow — position driven by --glow-x/--glow-y set in onMouseMove */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px 180px at var(--glow-x, 20%) var(--glow-y, 0%), rgba(155,140,255,${isSignature ? 0.16 : 0.10}), transparent 70%)`,
        }}
      />

      <div className="relative mb-6 flex items-start justify-between">
        <div
          className={`grid h-11 w-11 place-items-center rounded-full border text-brass transition-colors ${
            isSignature ? "border-brass-dim" : "border-hairline-strong group-hover:border-brass-dim"
          }`}
        >
          {icon}
        </div>
        <div className="flex items-center gap-2">
          {isSignature && (
            <span className="rounded-full border border-brass-dim px-2.5 py-1 font-mono text-[10px] tracking-wide text-brass">
              CORE
            </span>
          )}
          <Stamp variant="live">Live</Stamp>
        </div>
      </div>
      <h3 className="relative mb-2.5 text-[21px]">{title}</h3>
      <p className="relative text-[14.5px] text-bone-dim">{description}</p>
      <div className="relative mt-6 flex justify-between border-t border-hairline pt-4 font-mono text-xs text-bone-faint">
        <span>Contract</span>
        <span>{contract}</span>
      </div>
    </div>
  );
}