import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A12",
          raised: "#111020",
          panel: "#17152A",
        },
        bone: {
          DEFAULT: "#F5F3ED",
          dim: "rgba(245, 243, 237, 0.62)",
          faint: "rgba(245, 243, 237, 0.38)",
        },
        brass: {
          DEFAULT: "#9B8CFF",
          dim: "rgba(155, 140, 255, 0.55)",
          glow: "rgba(155, 140, 255, 0.16)",
        },
        verdant: {
          DEFAULT: "#4D6FD9",
          bright: "#7C9CFF",
        },
        rust: "#B057E8",
        hairline: "rgba(245, 243, 237, 0.09)",
        "hairline-strong": "rgba(245, 243, 237, 0.16)",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "SF Mono", "monospace"],
      },
      maxWidth: {
        container: "1160px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-2%, 2%)" },
        },
        shine: {
          "0%, 100%": { transform: "translateX(-45%) translateY(-10%) rotate(12deg)" },
          "50%": { transform: "translateX(45%) translateY(10%) rotate(12deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        // New — cinematic motion layer
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(-4%, 2%)" },
          "30%": { transform: "translate(2%, -4%)" },
          "40%": { transform: "translate(-2%, 5%)" },
          "50%": { transform: "translate(-4%, 2%)" },
          "60%": { transform: "translate(3%, 0)" },
          "70%": { transform: "translate(0, 3%)" },
          "80%": { transform: "translate(-3%, 0)" },
          "90%": { transform: "translate(2%, 2%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
        meshShift: {
          "0%, 100%": { transform: "translate(0%, 0%) rotate(0deg) scale(1)" },
          "33%": { transform: "translate(3%, -4%) rotate(3deg) scale(1.05)" },
          "66%": { transform: "translate(-3%, 3%) rotate(-2deg) scale(0.98)" },
        },
        revealLine: {
          "0%": { transform: "translateY(110%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        drift: "drift 18s ease-in-out infinite",
        shine: "shine 14s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        grain: "grain 1.1s steps(9) infinite",
        marquee: "marquee 32s linear infinite",
        pulseGlow: "pulseGlow 2.6s ease-in-out infinite",
        meshShift: "meshShift 22s ease-in-out infinite",
        revealLine: "revealLine 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;