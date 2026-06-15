import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Heart, Map, ShieldCheck, Sparkles, Sun } from 'lucide-react'
import SiteShell from '@/components/site-shell'
import Hero from '@/components/hero'
import ActivityCard from '@/components/activity-card'
import Testimonials from '@/components/testimonials'
import WhatsAppButton from '@/components/whatsapp-button'
import { getFeaturedActivities, getTestimonials, getSiteSettings } from '@/sanity/lib/fetch'

export const revalidate = 60

async function HomeContent() {
  const [featured, testimonials, settings] = await Promise.all([
    getFeaturedActivities(),
    getTestimonials(),
    getSiteSettings(),
  ])

  return (
    <>
      <Hero />

      {/* Intro */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1572908721147-0a9eb395762d?w=1200&q=80" alt="Balinese culture" fill className="object-cover" sizes="(min-width:1024px) 500px, 100vw" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-700 font-semibold">About Kayasa</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-emerald-950 mt-3 leading-tight">
              We make Bali feel like home.
            </h2>
            <p className="mt-5 text-emerald-900/80 text-lg leading-relaxed">
              {settings.companyDescription}
            </p>
            <p className="mt-4 text-emerald-900/80 leading-relaxed">
              Every tour is led by an English-speaking local guide who grew up on the island. We skip the tourist traps and show you the Bali we love  the sunrise spots locals visit, the warungs Grandma still cooks at, and the temples that haven&apos;t made it onto Instagram (yet).
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-900 transition">
                Our story <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured activities */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-stone-50 to-emerald-50/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-emerald-700 font-semibold">Featured</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-emerald-950 mt-2">Most loved experiences</h2>
            </div>
            <Link href="/activities" className="text-emerald-700 hover:text-emerald-900 font-semibold inline-flex items-center gap-2">
              View all activities <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((a) => <ActivityCard key={a._id} activity={a} />)}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-700 font-semibold">Why choose us</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-emerald-950 mt-2">The Kayasa difference</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Heart, title: 'Local-led tours', desc: 'Every guide is born and raised in Bali  authentic stories, hidden gems.' },
              { icon: ShieldCheck, title: 'Safety first', desc: 'Licensed drivers, insured trips, and 24/7 WhatsApp support throughout your journey.' },
              { icon: Map, title: 'Hand-crafted itineraries', desc: 'No mass tourism. Small groups, flexible timing, and customizable stops.' },
              { icon: Award, title: '5-star rated', desc: 'Hundreds of glowing reviews from travellers in over 40 countries.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-7 rounded-2xl bg-white ring-1 ring-emerald-100 hover:ring-emerald-300 hover:shadow-lg transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-emerald-950 mb-2">{title}</h3>
                <p className="text-sm text-emerald-900/75 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials items={testimonials} />

      {/* CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1654703942329-01d6a0a3ed62?w=2000&q=80" alt="Bali coastline" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/80 to-emerald-950/90" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center text-white">
          <Sparkles className="mx-auto mb-4 text-amber-300" size={32} />
          <h2 className="font-serif text-3xl md:text-6xl font-bold leading-tight">
            Ready for your Bali story?
          </h2>
          <p className="mt-5 text-lg text-emerald-50/90 max-w-2xl mx-auto leading-relaxed">
            Tell us what you dream of  a sunrise hike, a temple ceremony, a hidden waterfall  and we&apos;ll craft it.
            One message on WhatsApp and our team replies within minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <WhatsAppButton label="Plan my Bali trip" message="Hello Kayasa! I'd like to plan a Bali trip. Could you help me?" />
            <Link href="/activities" className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 px-7 py-3.5 font-semibold transition">
              Browse all tours <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default function Page() {
  return (
    <SiteShell>
      <HomeContent />
    </SiteShell>
  )
}
