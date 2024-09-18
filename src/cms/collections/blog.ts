import { collection, fields } from '@keystatic/core'

export const blog = collection({
  label: 'Посты/Статьи',
  slugField: 'title',
  path: 'src/content/blog/**/*',
  entryLayout: 'content',
  columns: ['title', 'pubDate', 'description', 'metaTitle', 'metaDescription', 'draft'],
  format: { contentField: 'content' },
  schema: {
    metaDescription: fields.text({
      description: 'SEO description of post',
      label: 'Meta Description',
      validation: { isRequired: true, length: { max: 160, min: 50 } }
    }),
    metaTitle: fields.text({
      label: 'Title',
      validation: { isRequired: true, length: { max: 60 } }
    }),
    pubDate: fields.date({ label: 'Published Date', validation: { isRequired: true } }),
    updatedDate: fields.date({ label: 'Updated Date' }),
    title: fields.slug({ name: { label: 'Заголовок' } }),
    description: fields.text({
      label: 'Описание',
      multiline: true
    }),
    ogImage: fields.image({
      label: 'Изображение',
      directory: 'src/assets/images',
      publicPath: '../../assets/images/'
    }),
    content: fields.mdx({
      label: 'Контент',
      description: '',
      options: {
        image: {
          directory: 'src/assets/images',
          publicPath: '../../assets/images/'
        }
      }
    }),
    tags: fields.multiselect({
      label: 'Теги',
      options: [{ label: 'Тег', value: 'Тег' }]
    }),
    draft: fields.checkbox({
      label: 'Черновик',
      defaultValue: false,
      description: 'Установите как черновик, чтобы предотвратить его публикацию.'
    })
  }
})
