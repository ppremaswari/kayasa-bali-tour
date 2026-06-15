import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Award, Heart, Map, ShieldCheck, Sparkles, Compass } from 'lucide-react'
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

      {/* Intro / About strip */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-soft-lg">
              <Image src="https://images.unsplash.com/photo-1572908721147-0a9eb395762d?w=1200&q=80" alt="Balinese culture" fill className="object-cover" sizes="(min-width:1024px) 500px, 100vw" />
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-amber-700 font-semibold">
              <Compass size={13} /> About Kayasa
            </span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-[56px] font-medium text-slate-900 mt-4 leading-[1.05] tracking-tight">
              A travel atelier, <span className="italic">not a booking site.</span>
            </h2>
            <p className="mt-6 text-slate-600 text-lg leading-relaxed max-w-xl">
              {settings.companyDescription}
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed max-w-xl">
              Every tour is led by an English-speaking local guide who grew up on the island. We skip the tourist traps and show you the Bali we love &mdash; sunrise spots locals visit, warungs Grandma still cooks at, and temples that haven&apos;t made it onto Instagram yet.
            </p>
            <div className="mt-8">
              <Link href="/about" className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-emerald-800 transition group">
                Read our story <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              <div>
                <div className="font-serif text-3xl text-slate-900 font-medium">10+</div>
                <div className="text-xs uppercase tracking-wider text-slate-500 mt-1">Years guiding</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-slate-900 font-medium">800+</div>
                <div className="text-xs uppercase tracking-wider text-slate-500 mt-1">Happy travellers</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-slate-900 font-medium">40+</div>
                <div className="text-xs uppercase tracking-wider text-slate-500 mt-1">Countries visited</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured activities */}
      <section className="py-24 md:py-28 bg-slate-50/60 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-[11px] uppercase tracking-[0.22em] text-amber-700 font-semibold">Featured journeys</span>
              <h2 className="font-serif text-3xl md:text-5xl font-medium text-slate-900 mt-3 tracking-tight">Hand-picked experiences.</h2>
              <p className="mt-4 text-slate-600 max-w-xl">Our most loved Bali tours &mdash; refined over a decade of guiding.</p>
            </div>
            <Link href="/activities" className="inline-flex items-center gap-2 text-slate-900 hover:text-emerald-800 font-semibold transition group">
              View all activities <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((a) => <ActivityCard key={a._id} activity={a} />)}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.22em] text-amber-700 font-semibold">The Kayasa difference</span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-slate-900 mt-3 tracking-tight">Quietly excellent.</h2>
            <p className="mt-4 text-slate-600">Why thousands of travellers trust us to design their Bali story.</p>
          </div>
          <div className="grid gap-px bg-slate-200 rounded-2xl overflow-hidden ring-1 ring-slate-200 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Heart, title: 'Local-led', desc: 'Every guide is born and raised in Bali  authentic stories, hidden gems.' },
              { icon: ShieldCheck, title: 'Safety first', desc: 'Licensed drivers, insured trips, and 24/7 WhatsApp support throughout your journey.' },
              { icon: Map, title: 'Hand-crafted', desc: 'No mass tourism. Small groups, flexible timing, and customizable stops.' },
              { icon: Award, title: '5-star rated', desc: 'Hundreds of glowing reviews from travellers in over 40 countries.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-8 bg-white hover:bg-slate-50/70 transition-colors">
                <div className="w-11 h-11 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center mb-5 group-hover:bg-emerald-900 transition">
                  <Icon size={18} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-slate-900 mb-2 tracking-tight">{title}</h3>
                <p className="text-[13.5px] text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials items={testimonials} />

      {/* CTA */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-slate-950">
        <Image src="https://images.unsplash.com/photo-1654703942329-01d6a0a3ed62?w=2000&q=80" alt="Bali coastline" fill className="object-cover opacity-30" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 to-slate-950" />
        <div className="relative max-w-3xl mx-auto px-4 md:px-6 text-center text-white">
          <Sparkles className="mx-auto mb-5 text-amber-400" size={28} />
          <h2 className="font-serif text-3xl md:text-6xl font-medium leading-[1.05] tracking-tight">
            Ready for your <span className="italic text-gradient-gold">Bali story</span>?
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto leading-relaxed font-light">
            Tell us what you dream of. One message on WhatsApp and our team replies within minutes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <WhatsAppButton label="Plan my Bali trip" message="Hello Kayasa! I'd like to plan a Bali trip. Could you help me?" />
            <Link href="/activities" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/[0.06] backdrop-blur-md border border-white/15 hover:bg-white/[0.12] px-6 py-3.5 text-[15px] font-semibold text-white transition">
              Browse all tours <ArrowRight size={17} />
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
