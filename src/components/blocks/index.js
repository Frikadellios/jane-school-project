import { fields } from '@keystatic/core'

export const BlogCard = {
  label: 'Blog Card',
  schema: fields.object({
    blogimage: fields.image({
      label: 'Blog Image',
      directory: '/public/images/',
      publicPath: '/images/'
    }),
    title: fields.text({
      label: 'blog Title'
    }),
    description: fields.text({ label: 'blog Description' }),
    button: fields.object({
      title: fields.text({
        label: 'button Title'
      }),
      link: fields.text({
        label: 'button link'
      })
    })
  })
}
