"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number; // 0 = far, 1 = near — drives size, brightness, and mouse-repulsion strength
  hue: [number, number, number];
};

type Pulse = {
  from: number;
  to: number;
  progress: number; // 0..1 along the edge
  speed: number;
  hue: [number, number, number];
};

const NODE_COUNT = 46;
const MAX_LINK_DIST = 160;
const MOUSE_LINK_DIST = 220;
const MOUSE_REPEL_RADIUS = 140;
const PULSE_SPAWN_CHANCE = 0.018; // per frame, per eligible edge
const MAX_ACTIVE_PULSES = 10;

const HUES: [number, number, number][] = [
  [155, 140, 255], // brass/violet
  [124, 156, 255], // verdant bright
  [176, 87, 232], // magenta/rust
];

function randomHue() {
  return HUES[Math.floor(Math.random() * HUES.length)];
}

export default function NetworkConstellation() {
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

    let nodes: Node[] = [];
    let pulses: Pulse[] = [];

    function makeNodes() {
      nodes = Array.from({ length: NODE_COUNT }, () => {
        const depth = Math.random();
        const angle = Math.random() * Math.PI * 2;
        const speed = reduceMotion ? 0 : (0.06 + depth * 0.14);
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          depth,
          hue: randomHue(),
        };
      });
      pulses = [];
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeNodes();
    }
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: width / 2, y: height / 2, active: false };
    const easedMouse = { x: width / 2, y: height / 2 };
    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }
    function onMouseLeave() {
      mouse.active = false;
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);

    let raf = 0;

    function spawnPulseMaybe(edges: { a: number; b: number; dist: number }[]) {
      if (reduceMotion || pulses.length >= MAX_ACTIVE_PULSES || edges.length === 0) return;
      if (Math.random() > PULSE_SPAWN_CHANCE * edges.length) return;
      const edge = edges[Math.floor(Math.random() * edges.length)];
      const forward = Math.random() > 0.5;
      pulses.push({
        from: forward ? edge.a : edge.b,
        to: forward ? edge.b : edge.a,
        progress: 0,
        speed: 0.008 + Math.random() * 0.01,
        hue: randomHue(),
      });
    }

    function frame() {
      easedMouse.x += (mouse.x - easedMouse.x) * 0.08;
      easedMouse.y += (mouse.y - easedMouse.y) * 0.08;

      ctx!.clearRect(0, 0, width, height);

      // Update node positions, with gentle repulsion away from the cursor —
      // this is what makes the field feel alive/interactive rather than a
      // looping animation playing at you.
      for (const n of nodes) {
        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          if (mouse.active) {
            const dx = n.x - easedMouse.x;
            const dy = n.y - easedMouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < MOUSE_REPEL_RADIUS && dist > 0.01) {
              const force = ((MOUSE_REPEL_RADIUS - dist) / MOUSE_REPEL_RADIUS) * 0.6 * n.depth;
              n.x += (dx / dist) * force;
              n.y += (dy / dist) * force;
            }
          }
        }
      }

      // Build the edge list once per frame (used for both drawing and pulse spawning)
      const edges: { a: number; b: number; dist: number }[] = [];
      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < MAX_LINK_DIST) {
            edges.push({ a: i, b: j, dist });
            const alpha = (1 - dist / MAX_LINK_DIST) * 0.22 * ((a.depth + b.depth) / 2);
            ctx!.strokeStyle = `rgba(155, 140, 255, ${alpha})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }

        // Lines from the cursor itself to nearby nodes — the "spotlight web"
        // effect that makes the whole field visibly respond to the user.
        if (mouse.active) {
          const n = nodes[i];
          const dist = Math.hypot(n.x - easedMouse.x, n.y - easedMouse.y);
          if (dist < MOUSE_LINK_DIST) {
            const alpha = (1 - dist / MOUSE_LINK_DIST) * 0.35;
            ctx!.strokeStyle = `rgba(176, 87, 232, ${alpha})`;
            ctx!.beginPath();
            ctx!.moveTo(n.x, n.y);
            ctx!.lineTo(easedMouse.x, easedMouse.y);
            ctx!.stroke();
          }
        }
      }

      // Nodes — soft glow, brighter/larger the "nearer" (higher depth) they are
      ctx!.globalCompositeOperation = "lighter";
      for (const n of nodes) {
        const r = 1.4 + n.depth * 2.2;
        const alpha = 0.35 + n.depth * 0.45;
        const gradient = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
        gradient.addColorStop(0, `rgba(${n.hue[0]}, ${n.hue[1]}, ${n.hue[2]}, ${alpha})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r * 5, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Traveling pulses — the "bridged value moving between chains" motif.
      // Drawn as a bright head with a short fading trail behind it.
      spawnPulseMaybe(edges);
      pulses = pulses.filter((p) => p.progress < 1);
      for (const p of pulses) {
        const a = nodes[p.from];
        const b = nodes[p.to];
        if (!a || !b) continue;
        p.progress += p.speed;

        for (let trail = 0; trail < 5; trail++) {
          const tp = Math.max(0, p.progress - trail * 0.025);
          const x = a.x + (b.x - a.x) * tp;
          const y = a.y + (b.y - a.y) * tp;
          const trailAlpha = (1 - trail / 5) * 0.9;
          const r = trail === 0 ? 2.6 : 1.6;
          const gradient = ctx!.createRadialGradient(x, y, 0, x, y, r * 5);
          gradient.addColorStop(0, `rgba(${p.hue[0]}, ${p.hue[1]}, ${p.hue[2]}, ${trailAlpha})`);
          gradient.addColorStop(1, "rgba(0,0,0,0)");
          ctx!.fillStyle = gradient;
          ctx!.beginPath();
          ctx!.arc(x, y, r * 5, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      ctx!.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
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