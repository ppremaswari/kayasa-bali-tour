upstrimport { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'
import { sampleActivities, sampleCategories, sampleTestimonials, sampleSiteSettings } from '@/sanity/lib/sample-data'

let client
let db

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME)
  }
  return db
}

function cors(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 200 }))
}

// Upload an external image URL into Sanity as an asset
async function uploadImageFromUrl(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const buffer = Buffer.from(await res.arrayBuffer())
    const asset = await writeClient.assets.upload('image', buffer, { filename: url.split('/').pop()?.split('?')[0] || 'image.jpg' })
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  } catch (e) {
    console.error('image upload failed', e?.message)
    return null
  }
}

async function seedSanity() {
  const summary = { categories: 0, activities: 0, testimonials: 0, siteSettings: false, errors: [] }

  // Categories
  const categoryRefMap = {}
  for (const c of sampleCategories) {
    try {
      const doc = await writeClient.createOrReplace({
        _id: c._id,
        _type: 'category',
        title: c.title,
        slug: { _type: 'slug', current: c.slug.current },
      })
      categoryRefMap[c._id] = doc._id
      summary.categories++
    } catch (e) { summary.errors.push(`cat:${c.title}:${e.message}`) }
  }

  // Activities (with image upload)
  for (const a of sampleActivities) {
    try {
      const cover = a.coverImage?.url ? await uploadImageFromUrl(a.coverImage.url) : null
      const gallery = []
      for (const g of a.galleryImages || []) {
        if (g?.url) {
          const img = await uploadImageFromUrl(g.url)
          if (img) gallery.push({ ...img, _key: uuidv4() })
        }
      }

      await writeClient.createOrReplace({
        _id: a._id,
        _type: 'activity',
        title: a.title,
        slug: { _type: 'slug', current: a.slug.current },
        shortDescription: a.shortDescription,
        fullDescription: [{ _type: 'block', _key: uuidv4(), style: 'normal', children: [{ _type: 'span', _key: uuidv4(), text: a.fullDescription, marks: [] }], markDefs: [] }],
        category: { _type: 'reference', _ref: categoryRefMap[a.category._id] || a.category._id },
        price: a.price,
        duration: a.duration,
        location: a.location,
        featured: a.featured,
        coverImage: cover || undefined,
        galleryImages: gallery.length ? gallery : undefined,
        highlights: a.highlights,
        included: a.included,
        excluded: a.excluded,
        publishedAt: new Date().toISOString(),
      })
      summary.activities++
    } catch (e) { summary.errors.push(`act:${a.title}:${e.message}`) }
  }

  // Testimonials
  for (const t of sampleTestimonials) {
    try {
      const avatar = t.avatar?.url ? await uploadImageFromUrl(t.avatar.url) : null
      await writeClient.createOrReplace({
        _id: t._id,
        _type: 'testimonial',
        customerName: t.customerName,
        country: t.country,
        review: t.review,
        rating: t.rating,
        avatar: avatar || undefined,
      })
      summary.testimonials++
    } catch (e) { summary.errors.push(`test:${t.customerName}:${e.message}`) }
  }

  // Site Settings (singleton)
  try {
    await writeClient.createOrReplace({
      _id: 'siteSettings',
      _type: 'siteSettings',
      ...sampleSiteSettings,
    })
    summary.siteSettings = true
  } catch (e) { summary.errors.push(`settings:${e.message}`) }

  return summary
}

async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    if (route === '/' && method === 'GET') {
      return cors(NextResponse.json({ message: 'Kayasa Bali Tour API' }))
    }

    if (route === '/seed-sanity' && method === 'POST') {
      const summary = await seedSanity()
      return cors(NextResponse.json({ ok: true, summary }))
    }

    if (route === '/status' && method === 'POST') {
      const db = await connectToMongo()
      const body = await request.json()
      const obj = { id: uuidv4(), client_name: body.client_name, timestamp: new Date() }
      await db.collection('status_checks').insertOne(obj)
      return cors(NextResponse.json(obj))
    }

    if (route === '/status' && method === 'GET') {
      const db = await connectToMongo()
      const rows = await db.collection('status_checks').find({}).limit(1000).toArray()
      return cors(NextResponse.json(rows.map(({ _id, ...r }) => r)))
    }

    return cors(NextResponse.json({ error: `Route ${route} not found` }, { status: 404 }))
  } catch (error) {
    console.error('API Error:', error)
    return cors(NextResponse.json({ error: 'Internal server error', detail: error.message }, { status: 500 }))
  }
}

export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
