import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Check, Clock, MapPin, X, ArrowLeft, Tag, ShieldCheck } from 'lucide-react'
import SiteShell from '@/components/site-shell'
import GalleryCarousel from '@/components/gallery-carousel'
import WhatsAppButton from '@/components/whatsapp-button'
import { getActivityBySlug, getAllActivitySlugs } from '@/sanity/lib/fetch'
import { PortableText } from '@portabletext/react'
import PriceDisplay from '@/components/price-display'
import { getExchangeRate } from '@/lib/currency'

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
    openGraph: { title: activity.seoTitle || activity.title, description: activity.seoDescription || activity.shortDescription },
  }
}

export default async function ActivityDetailPage({ params }) {
  const activity = await getActivityBySlug(params.slug)
  if (!activity) notFound()
  const exchange = await getExchangeRate()

  const gallery = activity.galleryImages?.length ? activity.galleryImages : [activity.coverImage].filter(Boolean)

  return (
    <SiteShell>
      <article className="max-w-6xl mx-auto px-4 md:px-6 pt-8 pb-24">
        <Link href="/activities" className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-sm font-medium mb-8 transition">
          <ArrowLeft size={15} /> All Activities
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {activity.category?.title && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700 bg-slate-100 rounded-md px-2.5 py-1 ring-1 ring-slate-200">
              <Tag size={10} /> {activity.category.title}
            </span>
          )}
          {activity.featured && (
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-800 bg-amber-50 rounded-md px-2.5 py-1 ring-1 ring-amber-200">Highlights</span>
          )}
        </div>

        <h1 className="font-serif text-4xl md:text-6xl font-medium text-slate-900 leading-[1.05] tracking-tight max-w-3xl">{activity.title}</h1>
        <p className="mt-5 text-slate-600 text-lg max-w-2xl leading-relaxed">{activity.shortDescription}</p>

        <div className="mt-6 flex flex-wrap gap-5 text-slate-600 text-sm">
          {activity.duration && <span className="inline-flex items-center gap-1.5"><Clock size={14} className="text-slate-400" />{activity.duration}</span>}
          {activity.location && <span className="inline-flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" />{activity.location}</span>}
        </div>

        <div className="mt-10">
          <GalleryCarousel images={gallery} title={activity.title} />
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {activity.fullDescription && (
              <section>
                <h2 className="font-serif text-2xl md:text-3xl font-medium text-slate-900 mb-4 tracking-tight">About This Experience</h2>
                <div className="text-slate-700 leading-relaxed text-[15.5px]">
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
                <h2 className="font-serif text-2xl md:text-3xl font-medium text-slate-900 mb-5 tracking-tight">Highlights</h2>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {activity.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-[14.5px] text-slate-700 bg-white ring-1 ring-slate-200 rounded-lg px-4 py-3 shadow-soft">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-600 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="grid md:grid-cols-2 gap-5">
              {activity.included?.length > 0 && (
                <section className="bg-white ring-1 ring-slate-200 rounded-2xl p-6 shadow-soft">
                  <h3 className="font-serif text-lg font-semibold text-slate-900 mb-4 tracking-tight">What's Included</h3>
                  <ul className="space-y-2.5">
                    {activity.included.map((i) => (
                      <li key={i} className="flex items-start gap-2 text-[13.5px] text-slate-700">
                        <Check size={15} className="text-emerald-700 mt-0.5 flex-shrink-0" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {activity.excluded?.length > 0 && (
                <section className="bg-slate-50/70 ring-1 ring-slate-200 rounded-2xl p-6">
                  <h3 className="font-serif text-lg font-semibold text-slate-900 mb-4 tracking-tight">What's Excluded</h3>
                  <ul className="space-y-2.5">
                    {activity.excluded.map((i) => (
                      <li key={i} className="flex items-start gap-2 text-[13.5px] text-slate-500">
                        <X size={15} className="text-slate-400 mt-0.5 flex-shrink-0" />
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
            <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft-lg overflow-hidden">
              <div className="p-7">
                <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">Start from</div>
                <div className="mt-2 flex items-baseline gap-1 flex-wrap">
                  <span className="font-serif text-[34px] md:text-[40px] font-medium text-slate-900 leading-none">
                  <PriceDisplay
                    priceUSD={activity.price}
                    exchangeRate={exchange.rate}
                  />
                  </span>
                  <span className="text-slate-500 text-sm ml-1">/ pax</span>
                </div>
                <div className="mt-2 text-xs text-slate-500">Book via WhatsApp - Best Price Guaranteed</div>

                <div className="mt-6 flex flex-col gap-2.5">
                  <WhatsAppButton
                    label="Reserve Now"
                    message={`Halo Kayasa! Saya tertarik dengan "${activity.title}". Mohon info ketersediaan dan detail harga.`}
                    className="w-full"
                  />
                  <WhatsAppButton
                    variant="outline"
                    label="Ask Us Anything"
                    message={`Halo Kayasa! Saya ada pertanyaan tentang "${activity.title}".`}
                    className="w-full"
                  />
                </div>

                <ul className="mt-6 pt-5 border-t border-slate-100 space-y-2.5 text-[12.5px] text-slate-600">
                  <li className="flex items-center gap-2"><Check size={14} className="text-emerald-700" /> Free Cancellation up to 24 Hours Before Departure</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-emerald-700" /> Instant Confirmation via WhatsApp</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-emerald-700" /> Local English-Speaking Guide</li>
                </ul>
              </div>
              <div className="bg-slate-50/80 border-t border-slate-100 px-7 py-4 flex items-center gap-2 text-[12px] text-slate-600">
                <ShieldCheck size={14} className="text-amber-600" /> 800+ Happy Travelers
              </div>
            </div>
          </aside>
        </div>
      </article>
    </SiteShell>
  )
}
