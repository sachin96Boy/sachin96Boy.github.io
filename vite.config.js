import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    // The lazily loaded 3D avatar chunk is mostly three.js (~665 kB, ~170 kB gzipped).
    chunkSizeWarningLimit: 700,
  },
});
