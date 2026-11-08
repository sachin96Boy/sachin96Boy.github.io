/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic tokens (ui-ux-pro-max developer dark palette: slate base + one green accent)
        bg: "#020617",
        surface: "#0F172A",
        "surface-2": "#1E293B",
        line: "#334155",
        fg: "#F8FAFC",
        muted: "#94A3B8",
        accent: {
          DEFAULT: "#22C55E",
          hover: "#4ADE80",
          soft: "#86EFAC",
        },
        "on-accent": "#052E16",
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
