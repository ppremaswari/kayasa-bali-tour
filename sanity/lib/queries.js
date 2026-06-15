import { groq } from 'next-sanity'

export const featuredActivitiesQuery = groq`
*[_type == "activity" && featured == true && defined(slug.current)] | order(publishedAt desc)[0...6] {
  _id, title, "slug": slug, shortDescription, price, duration, location, featured, coverImage,
  "category": category->{ _id, title, "slug": slug }
}`

export const allActivitiesQuery = groq`
*[_type == "activity" && defined(slug.current)] | order(featured desc, publishedAt desc) {
  _id, title, "slug": slug, shortDescription, price, duration, location, featured, coverImage,
  "category": category->{ _id, title, "slug": slug }
}`

export const activityBySlugQuery = groq`
*[_type == "activity" && slug.current == $slug][0]{
  _id, title, "slug": slug, shortDescription, fullDescription, price, duration, location, featured,
  coverImage, galleryImages, highlights, included, excluded, seoTitle, seoDescription, publishedAt,
  "category": category->{ _id, title, "slug": slug }
}`

export const allCategoriesQuery = groq`
*[_type == "category"] | order(title asc) { _id, title, "slug": slug, description }`

export const testimonialsQuery = groq`
*[_type == "testimonial"] | order(_createdAt desc)[0...8] {
  _id, customerName, country, review, rating, avatar
}`

export const siteSettingsQuery = groq`
*[_type == "siteSettings"][0]{
  companyName, companyDescription, whatsappNumber, email, address, instagram, facebook
}`

export const activitySlugsQuery = groq`
*[_type == "activity" && defined(slug.current)][].slug.current`
