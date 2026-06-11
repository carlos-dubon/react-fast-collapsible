import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'react-fast-collapsible': fileURLToPath(
        new URL('../../packages/react-fast-collapsible/src/index.ts', import.meta.url),
      ),
    },
  },
  server: {
    fs: {
      allow: ['../..'],
    },
  },
});
