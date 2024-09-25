import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, passthroughImageService } from 'astro/config'
import rehypeExternalLinks from 'rehype-external-links'
import { remarkReadingTime } from './src/utils/readTime'
// https://astro.build/config
export default defineConfig({
  site: 'https://jane-school.pages.dev',
  vite: {
    ssr: {
      external: ['node:buffer']
    },
    build: {
      minify: false,
      cssMinify: 'lightningcss',
      chunkSizeWarningLimit: 2000
    },
    plugins: [tailwindcss()]
  },
  i18n: {
    defaultLocale: 'uk',
    locales: ['en', 'ru', 'uk'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  experimental: {
    contentCollectionCache: true
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'uk',
        locales: {
          en: 'en-US',
          ru: 'ru-UA',
          uk: 'uk-UA'
        }
      }
    }),
    partytown({
      config: {
        debug: false,
        forward: ['dataLayer.push']
      }
    })
  ],
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
  output: 'server',
  image: { service: passthroughImageService() },
  adapter: cloudflare({
    imageService: 'cloudflare',
    platformProxy: {
      enabled: true
    }
  })
})
