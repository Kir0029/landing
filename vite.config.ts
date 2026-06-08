import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2020',
    cssMinify: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
