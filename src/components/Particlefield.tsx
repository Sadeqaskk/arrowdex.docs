"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  depth: number; // 0 = far/background, 1 = near/foreground — drives parallax strength, size, and speed
  hue: [number, number, number];
  twinkleSpeed: number;
  twinklePhase: number;
  driftAngle: number;
  driftSpeed: number;
};

const PARTICLE_COUNT = 70;
const HUES: [number, number, number][] = [
  [155, 140, 255],
  [124, 156, 255],
  [176, 87, 232],
  [245, 243, 237],
];

function makeParticles(width: number, height: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => {
    const depth = Math.random();
    const x = Math.random() * width;
    const y = Math.random() * height;
    return {
      x,
      y,
      baseX: x,
      baseY: y,
      size: 0.6 + depth * 2.4,
      depth,
      hue: HUES[Math.floor(Math.random() * HUES.length)],
      twinkleSpeed: 0.4 + Math.random() * 0.8,
      twinklePhase: Math.random() * Math.PI * 2,
      driftAngle: Math.random() * Math.PI * 2,
      driftSpeed: 0.02 + depth * 0.05,
    };
  });
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = makeParticles(width, height);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = makeParticles(width, height);
    }
    resize();
    window.addEventListener("resize", resize);

    // Target vs. eased mouse position — the ease is what makes the parallax
    // feel like it has weight instead of snapping to the cursor.
    const mouse = { x: width / 2, y: height / 2 };
    const eased = { x: width / 2, y: height / 2 };
    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let raf = 0;
    let t = 0;

    function frame() {
      eased.x += (mouse.x - eased.x) * 0.03;
      eased.y += (mouse.y - eased.y) * 0.03;
      const parallaxX = (eased.x - width / 2) / width;
      const parallaxY = (eased.y - height / 2) / height;

      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter"; // additive glow — light sources over the shader, not flat dots

      for (const p of particles) {
        if (!reduceMotion) {
          p.x = p.baseX + Math.cos(t * p.driftSpeed + p.driftAngle) * 14 * (0.4 + p.depth);
          p.y = p.baseY + Math.sin(t * p.driftSpeed * 0.8 + p.driftAngle) * 14 * (0.4 + p.depth);
        }

        // Nearer particles (higher depth) shift more with the cursor —
        // this differential is what actually reads as "depth" rather than
        // everything moving together like a single flat sheet.
        const px = p.x - parallaxX * 60 * p.depth;
        const py = p.y - parallaxY * 60 * p.depth;

        const twinkle = reduceMotion ? 0.6 : 0.35 + 0.65 * Math.abs(Math.sin(t * p.twinkleSpeed * 0.02 + p.twinklePhase));
        const alpha = twinkle * (0.15 + p.depth * 0.35);

        const gradient = ctx!.createRadialGradient(px, py, 0, px, py, p.size * 6);
        gradient.addColorStop(0, `rgba(${p.hue[0]}, ${p.hue[1]}, ${p.hue[2]}, ${alpha})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(px, py, p.size * 6, 0, Math.PI * 2);
        ctx!.fill();
      }

      t += reduceMotion ? 0 : 1;
      raf = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[2]"
      aria-hidden="true"
    />
  );
}