import cloudflare from '@astrojs/cloudflare'
import markdoc from '@astrojs/markdoc'
import mdx from '@astrojs/mdx'
import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import keystaticAstro from '@keystatic/astro'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import rehypeExternalLinks from 'rehype-external-links'
import { remarkReadingTime } from './src/utils/readTime'
import icon from 'astro-icon';
// https://astro.build/config
export default defineConfig({
  site: 'https://jane-school.pages.dev',
  vite: {
    build: {
      cssMinify: 'lightningcss'
    },
    plugins: [tailwindcss()],
    define: {
      'process.env': process.env
    }
  },
  experimental: {
    contentCollectionCache: true
  },
  integrations: [react(), mdx(), sitemap(), partytown({
    config: {
      debug: false,
      forward: ['dataLayer.push']
    }
  }), markdoc({ allowHTML: true }), keystaticAstro(), icon()],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: {
            type: 'text',
            value: ' 🔗'
          },
          target: '_blank',
          rel: ['nofollow', 'noreferrer']
        }
      ]
    ],
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true
    },
    gfm: true
  },
  output: 'hybrid',
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: true
    }
  })
})