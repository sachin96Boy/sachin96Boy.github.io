import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The lazily loaded 3D avatar chunk is mostly three.js (~540 kB, ~145 kB gzipped).
    chunkSizeWarningLimit: 600,
  },
})
