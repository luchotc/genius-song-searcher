import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/genius': {
        target: 'https://api.genius.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/genius/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Add authorization header to proxy request
            const token = process.env.GENIUS_ACCESS_TOKEN;
            if (token) {
              proxyReq.setHeader('Authorization', `Bearer ${token}`);
            }
            proxyReq.setHeader('User-Agent', 'Genius-Song-Searcher/1.0');
          });
        },
      },
    },
  },
})
