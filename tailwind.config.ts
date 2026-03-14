import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        hero: [
          "clamp(3.5rem, 7.5vw, 5.25rem)",
          { lineHeight: "0.96", letterSpacing: "-0.04em" },
        ],
        section: [
          "clamp(2.125rem, 4.5vw, 3rem)",
          { lineHeight: "1", letterSpacing: "-0.03em" },
        ],
        subhead: ["0.9375rem", { lineHeight: "1.4", letterSpacing: "-0.015em" }],
        body: ["0.875rem", { lineHeight: "1.55", letterSpacing: "0" }],
        "body-lg": ["0.9375rem", { lineHeight: "1.5", letterSpacing: "0" }],
        eyebrow: ["0.5rem", { lineHeight: "1.1", letterSpacing: "0.25em" }],
        metric: [
          "2rem",
          { lineHeight: "0.95", letterSpacing: "-0.035em" },
        ],
        "metric-sm": ["0.5rem", { lineHeight: "1.2", letterSpacing: "0.12em" }],
        quote: ["1rem", { lineHeight: "1.45", letterSpacing: "-0.015em" }],
        "card-title": ["1rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
      },
      colors: {
        ink: {
          50: "#f7f6f5",
          100: "#ebe9e6",
          200: "#d6d2cc",
          300: "#b8b2a8",
          400: "#9a9286",
          500: "#7d756a",
          600: "#645e55",
          700: "#524d46",
          800: "#45413c",
          900: "#3c3935",
          950: "#1a1816",
        },
        paper: {
          50: "#fdfcfb",
          100: "#faf8f5",
          200: "#f4f0ea",
          300: "#ebe5db",
        },
        accent: {
          DEFAULT: "#2c5f6f",
          light: "#3d7a8c",
          dark: "#1e424e",
          muted: "#e8f1f4",
        },
      },
      spacing: {
        section: "clamp(2.75rem, 5vw, 4.5rem)",
        "section-sm": "clamp(1.75rem, 3.5vw, 3rem)",
      },
      animation: {
        ticker: "ticker 45s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.5s ease-out both",
        "signal-flow": "signal-flow 2.5s ease-in-out infinite",
        "node-pulse": "node-pulse 2.5s ease-in-out infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "signal-flow": {
          "0%, 100%": { strokeDashoffset: "0", opacity: "0.6" },
          "50%": { strokeDashoffset: "8", opacity: "1" },
        },
        "node-pulse": {
          "0%, 100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(26 24 22 / 0.06)",
        "card-hover": "0 4px 12px 0 rgb(26 24 22 / 0.08)",
        glow: "0 0 20px -4px rgb(44 95 111 / 0.25)",
        "glow-sm": "0 0 12px -2px rgb(44 95 111 / 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
