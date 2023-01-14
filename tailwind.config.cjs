/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'service' : "url('/imageAssets/Night-sky-Image.jpg')",
      }
    },
  },
  plugins: [],
}
