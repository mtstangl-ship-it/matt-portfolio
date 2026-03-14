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
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-source-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(2.5rem, 5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "section": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "subhead": ["1.125rem", { lineHeight: "1.5", letterSpacing: "0" }],
        "body": ["1rem", { lineHeight: "1.7", letterSpacing: "0.01em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65", letterSpacing: "0.01em" }],
        "eyebrow": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.15em" }],
        "metric": ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "metric-sm": ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.02em" }],
        "quote": ["1.25rem", { lineHeight: "1.5", letterSpacing: "0" }],
        "card-title": ["1.25rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
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
        section: "clamp(4rem, 10vw, 8rem)",
        "section-sm": "clamp(3rem, 6vw, 5rem)",
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.5s ease-out both",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(26 24 22 / 0.04)",
        "card-hover": "0 4px 12px 0 rgb(26 24 22 / 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
