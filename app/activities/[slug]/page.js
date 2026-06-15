import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Check, Clock, MapPin, X, ArrowLeft, Tag } from 'lucide-react'
import SiteShell from '@/components/site-shell'
import GalleryCarousel from '@/components/gallery-carousel'
import WhatsAppButton from '@/components/whatsapp-button'
import { getActivityBySlug, getAllActivitySlugs } from '@/sanity/lib/fetch'
import { formatPrice } from '@/lib/whatsapp'
import { PortableText } from '@portabletext/react'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllActivitySlugs()
  return slugs.map((s) => ({ slug: s }))
}

export async function generateMetadata({ params }) {
  const activity = await getActivityBySlug(params.slug)
  if (!activity) return { title: 'Activity not found' }
  return {
    title: activity.seoTitle || activity.title,
    description: activity.seoDescription || activity.shortDescription,
    openGraph: {
      title: activity.seoTitle || activity.title,
      description: activity.seoDescription || activity.shortDescription,
    },
  }
}

export default async function ActivityDetailPage({ params }) {
  const activity = await getActivityBySlug(params.slug)
  if (!activity) notFound()

  const gallery = activity.galleryImages?.length ? activity.galleryImages : [activity.coverImage].filter(Boolean)

  return (
    <SiteShell>
      <article className="max-w-6xl mx-auto px-4 md:px-6 pt-8 pb-20">
        <Link href="/activities" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900 text-sm font-medium mb-6">
          <ArrowLeft size={16} /> All activities
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          {activity.category?.title && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-100 rounded-full px-3 py-1">
              <Tag size={11} /> {activity.category.title}
            </span>
          )}
          {activity.featured && (
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-300 rounded-full px-3 py-1">Featured</span>
          )}
        </div>

        <h1 className="font-serif text-3xl md:text-5xl font-bold text-emerald-950 leading-tight">{activity.title}</h1>
        <p className="mt-3 text-emerald-800/80 text-lg max-w-3xl">{activity.shortDescription}</p>

        <div className="mt-5 flex flex-wrap gap-5 text-emerald-700 text-sm">
          {activity.duration && <span className="inline-flex items-center gap-1.5"><Clock size={15} />{activity.duration}</span>}
          {activity.location && <span className="inline-flex items-center gap-1.5"><MapPin size={15} />{activity.location}</span>}
        </div>

        <div className="mt-8">
          <GalleryCarousel images={gallery} title={activity.title} />
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {activity.fullDescription && (
              <section>
                <h2 className="font-serif text-2xl font-bold text-emerald-950 mb-4">About this experience</h2>
                <div className="prose prose-emerald max-w-none text-emerald-900/90 leading-relaxed">
                  {Array.isArray(activity.fullDescription) ? (
                    typeof activity.fullDescription[0] === 'string' ? (
                      activity.fullDescription.map((p, i) => <p key={i} className="mb-3">{p}</p>)
                    ) : (
                      <PortableText value={activity.fullDescription} />
                    )
                  ) : (
                    <p>{activity.fullDescription}</p>
                  )}
                </div>
              </section>
            )}

            {activity.highlights?.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl font-bold text-emerald-950 mb-4">Highlights</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {activity.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-emerald-900">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {activity.included?.length > 0 && (
                <section className="bg-emerald-50/60 rounded-2xl p-6">
                  <h3 className="font-serif text-lg font-bold text-emerald-950 mb-4">What&apos;s included</h3>
                  <ul className="space-y-2.5">
                    {activity.included.map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-emerald-900">
                        <Check size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {activity.excluded?.length > 0 && (
                <section className="bg-rose-50/50 rounded-2xl p-6">
                  <h3 className="font-serif text-lg font-bold text-rose-950 mb-4">What&apos;s excluded</h3>
                  <ul className="space-y-2.5">
                    {activity.excluded.map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-rose-900">
                        <X size={16} className="text-rose-500 mt-0.5 flex-shrink-0" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          {/* Booking sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-white ring-1 ring-emerald-100 shadow-xl p-7">
              <div className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Starting from</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-serif text-5xl font-bold text-emerald-950">{formatPrice(activity.price)}</span>
                <span className="text-emerald-700">/ person</span>
              </div>
              <p className="mt-4 text-sm text-emerald-800/80">Reserve directly with our team via WhatsApp  no hidden fees, instant reply, free to customize.</p>
              <div className="mt-5 flex flex-col gap-3">
                <WhatsAppButton
                  label="Book via WhatsApp"
                  message={`Hello Kayasa! I'm interested in "${activity.title}". Could you share availability and pricing details?`}
                  className="w-full"
                />
                <WhatsAppButton
                  variant="outline"
                  label="Ask a question"
                  message={`Hello Kayasa! I have a question about "${activity.title}".`}
                  className="w-full"
                />
              </div>
              <ul className="mt-6 space-y-2 text-xs text-emerald-800/80">
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Free cancellation up to 24h before</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Instant WhatsApp confirmation</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-emerald-600" /> English-speaking local guide</li>
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </SiteShell>
  )
}
