import { getAllActivitySlugs } from '@/sanity/lib/fetch'

const BASE_URL = 'https://kayasabalitour.com'

export default async function sitemap() {
  const slugs = await getAllActivitySlugs()

  const activityPages = slugs.map((slug) => ({
    url: `${BASE_URL}/activities/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/activities`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...activityPages,
  ]
}