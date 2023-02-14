/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      slate: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
    },
    fontFamily:{
      roboto: ['Roboto', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        service: "url('/imageAssets/Night-sky-Image.webp')",
        contactbg: "url('/imageAssets/mybanner.webp')",
      },
    },
  },
  plugins: [],
});
