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
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        drift: "drift 18s ease-in-out infinite",
        shine: "shine 14s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;