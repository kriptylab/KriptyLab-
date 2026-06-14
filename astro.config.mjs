// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://kriptylab.it',
  integrations: [sitemap(), mdx(), partytown({ config: { forward: ["dataLayer.push"] } })],

  vite: {
    plugins: [tailwindcss()]
  }
});