"use client";

import { useEffect, useRef, useState } from "react";

function formatNumber(n: number, decimals = 0) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function StatCounter({
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(0);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const start = performance.now();

          function tick(now: number) {
            const raw = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - raw, 3);
            setDisplay(value * eased);
            setProgress(eased * 100);
            if (raw < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="relative border-l border-hairline-strong pl-6">
      <div className="font-mono text-[13px] uppercase tracking-widest text-bone-faint">
        {label}
      </div>
      <div className="mt-3 font-serif text-[38px] leading-none text-bone md:text-[44px]">
        {prefix}
        {formatNumber(display, decimals)}
        {suffix}
      </div>
      {/* Fill accent synced to the count-up itself — echoes the progress
          bars used throughout the app rather than a decorative one-off */}
      <div className="absolute -left-px top-0 h-full w-px overflow-hidden bg-transparent">
        <div
          className="w-full bg-gradient-to-b from-brass to-transparent transition-[height] duration-100 ease-linear"
          style={{ height: `${progress}%` }}
        />
      </div>
    </div>
  );
}