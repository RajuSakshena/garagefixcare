import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Root-relative assets for Vercel and SPA routes
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // ⚡ avoid optimize errors
  },
  build: {
    outDir: 'dist', // ✅ build output folder
    assetsDir: 'assets', // ✅ keep assets inside /dist/assets
  },
})
