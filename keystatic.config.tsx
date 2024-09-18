import { config } from '@keystatic/core'
import { blog, pages, work } from 'src/cms/collections'
import { home, navbar, settings } from 'src/cms/singletons'

import { configs } from '@/configs'
import { schemas } from '@/schemas'
import { t } from '@/utils'

const { categories, postPage, posts, postsGrid, tags, uiAdmin, uiWebsite, website } = schemas

export default config({
  storage: import.meta.env.DEV
    ? {
        kind: 'local'
      }
    : {
        kind: 'github',
        repo: 'Frikadellios/devopsick'
      },
  ui: {
    brand: { name: configs.website.title },
    navigation: {
      [t('ui-admin', 'navigation.collections.label')]: ['posts', 'blog', 'work', 'pages', 'categories', 'tags'],
      [t('ui-admin', 'navigation.configuration.label')]: [
        'website',
        'home',
        'navbar',
        'settings',
        'postsGrid',
        'postPage'
      ],
      [t('ui-admin', 'navigation.translations.label')]: ['uiWebsite', 'uiAdmin']
    }
  },
  collections: {
    posts,
    categories,
    tags,
    work,
    blog,
    pages
  },
  singletons: {
    website,
    postsGrid,
    postPage,
    uiWebsite,
    uiAdmin,
    home,
    navbar,
    settings
  }
})
