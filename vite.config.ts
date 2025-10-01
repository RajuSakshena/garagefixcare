import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',  // ✅ Relative paths for hosting (GoDaddy/Hostinger)
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // ⚡ avoid optimize errors
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist', // ✅ build output folder
    assetsDir: 'assets', // ✅ keep assets inside /dist/assets
  },
})
