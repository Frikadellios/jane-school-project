import { collection, config, fields, singleton } from '@keystatic/core'
import { BlogCard } from './src/components/blocks/index'

export default config({
  storage: {
    kind: 'local'
  },
  collections: {
    Pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*',
      schema: {
        title: fields.slug({
          name: {
            label: 'Page Title'
          }
        }),
        seoData: fields.object({
          seoTitle: fields.text({ label: 'SEO Title' }),
          seoDesription: fields.text({ label: 'SEO Description' }),
          ogImage: fields.image({
            label: 'Open Graph Image',
            directory: '/public/images/seo/',
            publicPath: '/images/seo/'
          })
        }),
        blocks: fields.blocks(
          {
            BlogCard: BlogCard
          },
          { label: 'Blocks' }
        )
      }
    }),
    blogs: collection({
      label: 'Blogs',
      slugField: 'title',
      path: 'src/content/blogs/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Page Title'
          }
        }),
        seoData: fields.object({
          seoTitle: fields.text({ label: 'SEO Title' }),
          seoDesription: fields.text({ label: 'SEO Description' }),
          ogImage: fields.image({
            label: 'Open Graph Image',
            directory: '/public/images/seo/',
            publicPath: '/images/seo/'
          })
        }),
        blogimage: fields.image({
          label: 'Blog Image',
          directory: '/public/images/',
          publicPath: '/images/'
        }),
        button: fields.object({
          title: fields.text({
            label: 'button Title'
          }),
          link: fields.text({
            label: 'button link'
          })
        }),
        updatedDate: fields.text({ label: 'updated Date' }),
        content: fields.markdoc({
          label: 'Page Content',
          extension: 'md'
        })
      }
    })
  },
  singletons: {
    Header: singleton({
      label: 'Header',
      path: 'src/content/header/',
      schema: {
        headerLogo: fields.image({
          label: 'Logo',
          directory: '/public/images/',
          publicPath: '/images/'
        }),
        subtitle: fields.text({ label: 'Subtitle' }),
        Ratingdescription: fields.text({ label: 'Rating Description' }),
        nav: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            link: fields.text({ label: 'link' }),

            children: fields.array(
              fields.object({
                title: fields.text({ label: 'Title' }),
                link: fields.text({ label: 'Link' })
              }),
              {
                label: 'Nav Links List',
                itemLabel: (props) => props.fields.title.value
              }
            )
          }),
          {
            label: 'Nav Links List',
            itemLabel: (props) => props.fields.title.value
          }
        )
      }
    }),
    footer: singleton({
      label: 'Footer',
      path: 'src/content/footer/',
      schema: {
        logo: fields.image({
          label: 'logo',
          directory: '/public/images/',
          publicPath: '/images/'
        })
      }
    })
  }
})
