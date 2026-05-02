import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    minify: 'oxc',
    cssMinify: 'lightningcss',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rolldownOptions: {
      output: {
        // Manual chunking — separate vendor libs into their own cacheable chunks
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react-icons')) return 'icons-vendor';
            if (id.includes('framer-motion')) return 'motion-vendor';
            if (id.includes('react-router')) return 'router-vendor';
            if (id.includes('react-dom') || id.includes('/react/')) return 'react-vendor';
            return 'vendor';
          }
        },
      },
    },
  },
})
