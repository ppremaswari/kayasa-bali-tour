import { client } from './client'
import {
  featuredActivitiesQuery,
  allActivitiesQuery,
  activityBySlugQuery,
  allCategoriesQuery,
  testimonialsQuery,
  siteSettingsQuery,
  activitySlugsQuery,
} from './queries'
import {
  sampleActivities,
  sampleCategories,
  sampleTestimonials,
  sampleSiteSettings,
} from './sample-data'

async function safeFetch(query, params = {}) {
  try {
    const data = await client.fetch(query, params, { next: { revalidate: 60 } })
    return data
  } catch (e) {
    console.error('[sanity fetch error]', e?.message)
    return null
  }
}

export async function getFeaturedActivities() {
  const data = await safeFetch(featuredActivitiesQuery)
  if (Array.isArray(data) && data.length > 0) return data
  return sampleActivities.filter((a) => a.featured)
}

export async function getAllActivities() {
  const data = await safeFetch(allActivitiesQuery)
  if (Array.isArray(data) && data.length > 0) return data
  return sampleActivities
}

export async function getActivityBySlug(slug) {
  const data = await safeFetch(activityBySlugQuery, { slug })
  if (data) return data
  return sampleActivities.find((a) => a.slug.current === slug) || null
}

export async function getAllCategories() {
  const data = await safeFetch(allCategoriesQuery)
  if (Array.isArray(data) && data.length > 0) return data
  return sampleCategories
}

export async function getTestimonials() {
  const data = await safeFetch(testimonialsQuery)
  if (Array.isArray(data) && data.length > 0) return data
  return sampleTestimonials
}

export async function getSiteSettings() {
  const data = await safeFetch(siteSettingsQuery)
  if (data && data.companyName) return data
  return sampleSiteSettings
}

export async function getAllActivitySlugs() {
  const data = await safeFetch(activitySlugsQuery)
  if (Array.isArray(data) && data.length > 0) return data
  return sampleActivities.map((a) => a.slug.current)
}
