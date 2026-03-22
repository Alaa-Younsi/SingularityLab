import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    minify: 'terser',
    cssCodeSplit: true,
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-vendor': ['framer-motion'],
          'router-vendor': ['react-router-dom'],
        },
      },
    },
  },
  // Security headers are handled by public/_headers for production deployments.
  // Do NOT apply them here — Vite's dev server needs inline scripts for HMR
  // and React Fast Refresh, which a strict CSP would block.
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
