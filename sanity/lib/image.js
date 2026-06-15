import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  if (!source) return null
  return builder.image(source)
}

export function imageUrl(source, width = 1200, height) {
  if (!source) return null
  // If it's already a string URL (fallback sample data), return as-is
  if (typeof source === 'string') return source
  if (source?.url) return source.url
  try {
    let b = builder.image(source).width(width).auto('format').fit('max')
    if (height) b = b.height(height)
    return b.url()
  } catch (e) {
    return null
  }
}
