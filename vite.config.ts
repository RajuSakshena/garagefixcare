
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',

    // Generate manifest to map source image imports
    // to their actual production asset URLs.
    manifest: true,
  },
});
