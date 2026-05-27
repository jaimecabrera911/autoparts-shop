import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://autoparts-demo.local',
  vite: {
    plugins: [tailwindcss()],
  },
});
