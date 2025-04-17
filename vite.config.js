import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Expose to network
    port: 5173,
    allowedHosts: ['reactcrudcooknest-production.up.railway.app'],
  },
});