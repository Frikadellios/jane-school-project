import { collection, fields } from '@keystatic/core'

export const pages = collection({
  label: 'Страницы',
  slugField: 'title',
  path: 'src/content/pages/*',
  entryLayout: 'content',
  columns: ['title', 'description', 'noIndex'],
  format: { contentField: 'content' },
  schema: {
    title: fields.slug({ name: { label: 'SEO Заголовок' } }),
    description: fields.text({
      label: 'SEO Описание',
      multiline: true
    }),
    ogImage: fields.image({
      label: 'Изображение',
      directory: 'src/assets/images',
      publicPath: '../../assets/images/'
    }),
    noIndex: fields.checkbox({
      label: 'НЕ Индексировать страницу?',
      defaultValue: false
    }),
    content: fields.mdx({
      label: 'Контент',
      options: {
        image: {
          directory: 'src/assets/images',
          publicPath: '../../assets/images/'
        }
      }
    })
  }
})
