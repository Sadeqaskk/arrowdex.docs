"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  DepthOfField,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";


const PALETTE = ["#9B8CFF", "#7C9CFF", "#B057E8", "#4D6FD9"];

/* ---------------- Floating glass shards ---------------- */
function Shards() {
  const group = useRef<THREE.Group>(null!);
  const shards = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      pos: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        -Math.random() * 8 - 1,
      ] as [number, number, number],
      scale: 0.9 + Math.random() * 2.2,
      speed: 0.05 + Math.random() * 0.12,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      color: PALETTE[i % PALETTE.length],
      geo: Math.random() > 0.5 ? "octa" : "icosa",
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.children.forEach((mesh, i) => {
      const s = shards[i];
      mesh.rotation.x += s.rotSpeed * 0.01;
      mesh.rotation.y += s.rotSpeed * 0.015;
      mesh.position.y = s.pos[1] + Math.sin(t * s.speed + i) * 0.6;
      mesh.position.x = s.pos[0] + Math.cos(t * s.speed * 0.7 + i) * 0.4;
    });
  });

  return (
    <group ref={group}>
      {shards.map((s, i) => (
        <mesh key={i} position={s.pos} scale={s.scale}>
          {s.geo === "octa" ? (
            <octahedronGeometry args={[1, 0]} />
          ) : (
            <icosahedronGeometry args={[1, 0]} />
          )}
          <meshPhysicalMaterial
            color={s.color}
            transmission={0.85}
            thickness={1.2}
            roughness={0.15}
            metalness={0.1}
            ior={1.4}
            reflectivity={0.6}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive={s.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- Particle depth field ---------------- */
function Particles() {
  const points = useRef<THREE.Points>(null!);
  const count = 600;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
      c.set(PALETTE[Math.floor(Math.random() * PALETTE.length)]);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.008;
    points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------------- Camera parallax rig ---------------- */
function ParallaxRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.02;
    camera.position.y += (mouse.y * 0.8 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, -5);
  });
  return null;
}

/* ---------------- Scene ---------------- */
function Scene() {
  return (
    <>
      <color attach="background" args={["#0A0A12"]} />
      <fog attach="fog" args={["#0A0A12", 6, 24]} />

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={90} color="#9B8CFF" distance={25} />
      <pointLight position={[-6, -3, -4]} intensity={70} color="#B057E8" distance={25} />
      <pointLight position={[0, 4, -8]} intensity={60} color="#7C9CFF" distance={30} />

      <Suspense fallback={null}>
        <Shards />
        <Particles />
      </Suspense>

      <ParallaxRig />

      <EffectComposer>
        <Bloom
          intensity={2.2}
          luminanceThreshold={0.05}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <DepthOfField focusDistance={0.01} focalLength={0.05} bokehScale={4} height={480} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0015, 0.0015)}
          radialModulation={false}
          modulationOffset={0}
        />
        <Noise opacity={0.025} />
        <Vignette eskil={false} offset={0.25} darkness={0.9} />
      </EffectComposer>
    </>
  );
}

export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55, near: 0.1, far: 100 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}