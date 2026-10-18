// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// Vercel exposes the production domain at build time; set SITE_URL to override (e.g. a custom domain)
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

// https://astro.build/config
export default defineConfig({
  site,
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});