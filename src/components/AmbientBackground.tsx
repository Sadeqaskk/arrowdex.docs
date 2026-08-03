import ShaderAurora from "./ShaderAurora";

/**
 * Full-viewport premium background.
 *
 * Primary layer: a real-time WebGL2 shader (see ShaderAurora.tsx) — a
 * domain-warped aurora/mesh gradient in the Arrow violet/blue/magenta
 * palette, with a glow that follows the cursor, a gentle scroll-linked
 * drift, a vignette, and fine grain so it reads as filmic rather than a
 * flat CSS gradient. This is the same category of background used by
 * sites like Linear, Stripe, and Raycast.
 *
 * Fallback layer: `.bg-atmosphere` (plain CSS radial gradients, defined in
 * globals.css). If a browser doesn't support WebGL2, ShaderAurora's canvas
 * simply never paints, and this sits underneath as a safe, static base —
 * the page never breaks.
 */
export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-ink">
      <div className="absolute inset-0 bg-atmosphere" />
      <ShaderAurora />

      {/* fine hairline grid on top, barely visible — reads as "engineered glass" */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,243,237,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,237,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}