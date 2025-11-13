import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Configure the proxy server here
    proxy: {
      // Proxy requests starting with /api
      '/api': {
        target: 'http://localhost:5000', // Your Express server address
        changeOrigin: true, // Needed for virtual hosting
        secure: false, // Set to true if using HTTPS backend
        // rewrite: (path) => path.replace(/^\/api/, ''), // Optional: remove /api prefix if backend routes don't start with /api
      },
    },
  },
});