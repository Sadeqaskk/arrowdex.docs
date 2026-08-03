"use client";

import { useEffect, useRef } from "react";

// Fullscreen triangle vertex shader — no attributes needed beyond position.
const VERT = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

// Domain-warped fbm "aurora" fragment shader: flowing violet/blue/magenta
// bands over near-black, a soft glow that follows the cursor, a gentle
// scroll-linked drift, a vignette, and fine grain to keep it filmic
// instead of flat/banded.
const FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 outColor;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_scroll;
uniform vec2 u_mouse;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.55;
  for (int i = 0; i < 5; i++) {
    v += amp * noise(p);
    p *= 2.02;
    amp *= 0.55;
  }
  return v;
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  float t = u_time * 0.035 + u_scroll * 0.00045;

  vec2 q = p * 1.4;
  q += 0.35 * vec2(fbm(q + t), fbm(q - t + 3.1));
  float n1 = fbm(q * 1.1 + t * 0.6);
  float n2 = fbm(q * 1.7 - t * 0.4 + 8.0);

  vec3 ink     = vec3(0.039, 0.039, 0.070); // #0A0A12
  vec3 violet  = vec3(0.608, 0.549, 1.000); // #9B8CFF
  vec3 blue    = vec3(0.486, 0.612, 1.000); // #7C9CFF
  vec3 magenta = vec3(0.690, 0.341, 0.910); // #B057E8

  vec3 col = ink;
  col = mix(col, blue,    smoothstep(0.25, 0.85, n1) * 0.55);
  col = mix(col, violet,  smoothstep(0.30, 0.90, n2) * 0.50);
  col = mix(col, magenta, smoothstep(0.55, 0.95, n1 * n2 * 1.4) * 0.40);

  // soft glow that follows the cursor
  vec2 mp = (u_mouse - 0.5) * vec2(aspect, 1.0);
  float mdist = length(p - mp);
  col += violet * 0.18 * smoothstep(0.55, 0.0, mdist);

  // vignette so edges stay dark and the center reads as the focal point
  float vig = smoothstep(1.1, 0.2, length(p));
  col *= mix(0.55, 1.0, vig);

  // fine grain — prevents gradient banding and gives it a filmic, premium feel
  float grain = (hash(uv * u_resolution.xy + u_time) - 0.5) * 0.035;
  col += grain;

  outColor = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ShaderAurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // No WebGL2 → bail out silently. AmbientBackground's CSS layer behind
    // this canvas is the fallback, so the page never breaks.
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // One oversized triangle covering the whole clip space — cheaper than a quad.
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const u_resolution = gl.getUniformLocation(program, "u_resolution");
    const u_time = gl.getUniformLocation(program, "u_time");
    const u_scroll = gl.getUniformLocation(program, "u_scroll");
    const u_mouse = gl.getUniformLocation(program, "u_mouse");

    const mouse = { x: 0.5, y: 0.5 };
    const targetMouse = { x: 0.5, y: 0.5 };
    let scrollY = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }
    function onMouseMove(e: MouseEvent) {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1 - e.clientY / window.innerHeight;
    }
    function onScroll() {
      scrollY = window.scrollY;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const start = performance.now();

    function frame(now: number) {
      mouse.x += (targetMouse.x - mouse.x) * 0.04;
      mouse.y += (targetMouse.y - mouse.y) * 0.04;

      const t = reduceMotion ? 0 : (now - start) / 1000;

      gl!.uniform2f(u_resolution, canvas!.width, canvas!.height);
      gl!.uniform1f(u_time, t);
      gl!.uniform1f(u_scroll, scrollY);
      gl!.uniform2f(u_mouse, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
  );
}