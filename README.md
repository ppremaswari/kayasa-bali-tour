# Kayasa Bali Tour

A production-ready Bali tour & travel website built with **Next.js 15** (App Router), **Tailwind CSS**, **shadcn/ui**, and **Sanity CMS**. All inquiries are handled via WhatsApp — no on-site checkout.

## ✨ Live Pages

- `/` — Home (hero, intro, featured activities, why-choose-us, testimonials, CTA)
- `/activities` — Activity grid with search + category filter
- `/activities/[slug]` — Activity detail with gallery carousel, highlights, included/excluded, WhatsApp booking sidebar
- `/about` — Company story
- `/contact` — Contact + WhatsApp CTA
- `/studio` — **Sanity Studio** (admin) — fully embedded

## 🪄 Content Management (Sanity)

The site reads from Sanity. **If Sanity is empty, the site shows beautiful built-in Bali sample data automatically**, so it always looks production-ready.

**To add real content:**
1. Go to **https://kayasa-bali-demo.preview.emergentagent.com/studio**
2. Log in with your Sanity account (the project owner)
3. Create entries under: Site Settings (singleton), Categories, Activities, Testimonials
4. Hit **Publish** — content appears on the live site within 60 s (ISR)

### Sanity schemas included
| Schema | Fields |
|---|---|
| **Activity** | title, slug, shortDescription, fullDescription (rich text), category (ref), price, duration, location, featured, coverImage (+hotspot), galleryImages, highlights, included, excluded, seoTitle, seoDescription, publishedAt |
| **Category** | title, slug, description |
| **Testimonial** | customerName, country, review, rating (1–5), avatar |
| **Site Settings** (singleton) | companyName, companyDescription, whatsappNumber, email, address, instagram, facebook |

## 💬 WhatsApp booking

Configured number: **+62 812-3765-6995** (env var `NEXT_PUBLIC_WHATSAPP_NUMBER`).

Every booking/CTA generates a dynamic deep-link like:
```
https://wa.me/6281237656995?text=Hello%20I%20am%20interested%20in%20Mount%20Batur%20Sunrise%20Trekking
```
- Floating WhatsApp button on every page
- Per-activity custom message pre-filled with the activity name

## 🔧 Tech & key files

```
/app
├── app/
│   ├── page.js                     # Home
│   ├── activities/page.js          # Listing + filters
│   ├── activities/[slug]/page.js   # Detail + booking
│   ├── about/page.js
│   ├── contact/page.js
│   ├── studio/[[...tool]]/page.js  # Embedded Sanity Studio
│   └── api/[[...path]]/route.js    # API (incl. /api/seed-sanity)
├── sanity/
│   ├── schemas/                    # activity, category, testimonial, siteSettings
│   └── lib/                        # client, image, queries, fetch (w/ fallback)
├── components/                     # navbar, footer, hero, activity-card, gallery-carousel, testimonials, whatsapp-button, site-shell
├── lib/whatsapp.js
├── sanity.config.js                # Studio config + custom desk structure
└── sanity.cli.js
```

## 🔑 Environment variables (in `/app/.env`)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=asv5ajay
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-06
SANITY_API_TOKEN=...                   # used for /api/seed-sanity (needs Editor role to write)
NEXT_PUBLIC_WHATSAPP_NUMBER=6281237656995
```

## ⚠️ Notes on the seed endpoint
A `POST /api/seed-sanity` endpoint exists to bulk-upload sample data into your Sanity project. Your current token is **Viewer (read-only)**, so seeding via API was blocked (`Insufficient permissions`). **The site doesn't need this** — it shows sample content automatically. If you want to push the sample data into Sanity for editing:
1. In **Sanity Manage → API → Tokens**, create a new token with **Editor** role
2. Replace `SANITY_API_TOKEN` in `/app/.env`, restart the server, and call `POST /api/seed-sanity`

## 🚀 Deployment
Already configured for Vercel-style deployment. Make sure to set the env vars above in your hosting platform, and add your prod domain to **Sanity → API → CORS origins** (with credentials enabled, for Studio access).
