import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000' // 👈 Ensure this matches your backend
    }
  }
});