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
        sans: ["var(--sans)", "sans-serif"],
        mono: ["var(--mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        hero: [
          "clamp(3.5rem, 7.5vw, 5.25rem)",
          { lineHeight: "0.96", letterSpacing: "-0.04em" },
        ],
        "hero-tight": [
          "clamp(1.75rem, 3.8vw, 2.25rem)",
          { lineHeight: "1.2", letterSpacing: "-0.02em" },
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
        // Premium light base — warm editorial, richer than stark white
        base: {
          DEFAULT: "#f2efea",
          50: "#f8f6f2",
          100: "#f2efea",
          200: "#eae6df",
        },
        ink: {
          50: "#f7f6f5",
          100: "#ebe9e6",
          150: "#e3e0db",
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
          50: "#fdfbf8",
          100: "#f9f6f1",
          200: "#f2ede5",
          300: "#e8e2d8",
        },
        surface: {
          50: "#f7f4ef",
          100: "#efece4",
          200: "#e5e0d6",
        },
        // Support tint — warmer, more presence for section alternation
        support: {
          DEFAULT: "#ebe7e0",
          50: "#f2efe8",
          100: "#ebe7e0",
          200: "#e2ddd4",
        },
        // Dashboard — darker, richer field (most energized visual layer)
        dashboard: {
          bg: "#1a1918",
          surface: "#22201e",
          card: "#2a2825",
          border: "#383531",
          muted: "#141312",
          "ink-light": "#e8e6e2",
          "ink-muted": "#a39f98",
        },
        // Electric accent — instrumentation, signal lines, highlights, active states
        accent: {
          DEFAULT: "#0d9488",
          light: "#14b8a6",
          dark: "#0f766e",
          muted: "#ccfbf1",
          tint: "#f0fdfa",
          // Brighter accent on dark (dashboard viz, signal lines)
          signal: "#22d3c7",
        },
        accentLegacy: {
          DEFAULT: "#2c5f6f",
          muted: "#e8f1f4",
        },
        // Impact Console — resolves via OKLCH variables defined in tokens-impact.css.
        // Using var() here lets Tailwind utilities (bg-impact-panel, text-impact-teal)
        // coexist with raw CSS vars inside the .impact-console wrapper.
        impact: {
          bg: "var(--bg)",
          "bg-2": "var(--bg-2)",
          panel: "var(--panel)",
          "panel-2": "var(--panel-2)",
          line: "var(--line)",
          "line-2": "var(--line-2)",
          muted: "var(--muted)",
          ink: "var(--ink)",
          "ink-2": "var(--ink-2)",
          teal: "var(--teal)",
          "teal-2": "var(--teal-2)",
          "teal-dim": "var(--teal-dim)",
          "teal-wash": "var(--teal-wash)",
        },
        // Per-case accent colors — scoped to the article[data-case] root via CSS
        // (see globals.css). Utilities like text-case-accent / border-case-accent
        // resolve to the right color for whichever case owns the current element.
        case: {
          accent: "var(--case-accent, var(--teal))",
          "accent-2": "var(--case-accent-2, var(--teal-2))",
          "accent-3": "var(--case-accent-3, var(--teal-dim))",
        },
      },
      spacing: {
        section: "clamp(2.5rem, 5vw, 4.5rem)",
        "section-sm": "clamp(1.5rem, 3.5vw, 3rem)",
      },
      animation: {
        ticker: "ticker 45s linear infinite",
        "ticker-slow": "ticker 65s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.5s ease-out both",
        "signal-flow": "signal-flow 1.4s ease-in-out infinite",
        "node-pulse": "node-pulse 1.2s ease-in-out infinite",
        "hero-flow": "hero-flow 1.2s ease-in-out infinite",
        "hero-pulse": "hero-pulse 1s ease-in-out infinite",
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
        "hero-flow": {
          "0%": { strokeDashoffset: "0", opacity: "0.85" },
          "50%": { strokeDashoffset: "20", opacity: "1" },
          "100%": { strokeDashoffset: "0", opacity: "0.85" },
        },
        "hero-pulse": {
          "0%, 100%": { opacity: "0.75", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.25)" },
        },
      },
      boxShadow: {
        card: "0 1px 4px 0 rgb(26 24 22 / 0.08), 0 1px 2px -1px rgb(26 24 22 / 0.04)",
        "card-hover": "0 8px 24px -4px rgb(26 24 22 / 0.1), 0 4px 8px -4px rgb(26 24 22 / 0.06)",
        "card-elevated": "0 4px 16px -2px rgb(26 24 22 / 0.09), 0 2px 6px -2px rgb(26 24 22 / 0.05)",
        portal: "0 4px 24px -2px rgb(26 24 22 / 0.14), 0 2px 10px -2px rgb(26 24 22 / 0.08)",
        "portal-hover": "0 16px 48px -8px rgb(26 24 22 / 0.2), 0 0 28px -4px rgb(13 148 136 / 0.22)",
        glow: "0 0 24px -4px rgb(13 148 136 / 0.35)",
        "glow-sm": "0 0 12px -2px rgb(13 148 136 / 0.25)",
        "dashboard-glow": "0 0 20px -2px rgb(34 211 199 / 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
