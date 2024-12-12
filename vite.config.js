import path from 'path';

import react from '@vitejs/plugin-react';
import ViteRestart from 'vite-plugin-restart';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    outDir: 'build/',
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
      },
    },
  },
  plugins: [react(), ViteRestart({ restart: ['yalc.lock'] })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
    deps: {
      inline: ['react-dom'],
    },
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
      include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
