// vite.config.js
import { defineConfig } from 'vite';
import react             from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // forward /api/* to your Express backend
      '/api': {
        target:      'http://localhost:4242',
        changeOrigin: true,
        secure:       false,
      }
    }
  },
  build: {
    outDir: 'dist',
    target:  'es2020',
    assetsInlineLimit:     4096,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          three:  ['three'],
          motion: ['framer-motion','gsap']
        }
      }
    }
  }
});
