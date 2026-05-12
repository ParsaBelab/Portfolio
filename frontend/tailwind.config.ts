import type { Config } from "tailwindcss";

/**
 * Design tokens are CSS variables (see globals.css) so theme switching is
 * instant and reduced-motion-friendly. Tailwind references them by name.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", md: "2rem", lg: "3rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        bg:      "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        border:  "rgb(var(--border) / <alpha-value>)",
        ink:     "rgb(var(--ink) / <alpha-value>)",
        muted:   "rgb(var(--muted) / <alpha-value>)",
        subtle:  "rgb(var(--subtle) / <alpha-value>)",
        accent:  "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        sans:    ["var(--font-sans)",    "ui-sans-serif", "system-ui", "sans-serif"],
        serif:   ["var(--font-serif)",   "ui-serif", "Georgia", "serif"],
        mono:    ["var(--font-mono)",    "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display": ["clamp(3rem, 8vw, 6.25rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
        "h1":      ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.02", letterSpacing: "-0.028em" }],
        "h2":      ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "h3":      ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "label":   ["0.6875rem", { lineHeight: "1", letterSpacing: "0.16em" }],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        prose: "62ch",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
