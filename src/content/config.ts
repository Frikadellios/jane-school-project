// @ts-ignore
import { defineCollection, z } from 'astro:content'

const postCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      image: image().optional()
    })
})

export const collections = {
  post: postCollection
}
