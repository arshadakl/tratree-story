import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://tratree.in',
  integrations: [react(), sitemap()],
  output: "hybrid",
  adapter: cloudflare()
});