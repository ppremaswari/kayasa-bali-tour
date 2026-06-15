import SiteShell from '@/components/site-shell'
import WhatsAppButton from '@/components/whatsapp-button'
import { Mail, MapPin, Phone, MessageCircle, Instagram, Facebook } from 'lucide-react'
import { getSiteSettings } from '@/sanity/lib/fetch'

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Kayasa Bali Tour. WhatsApp is the fastest way  we reply within minutes.',
}

export default async function ContactPage() {
  const s = await getSiteSettings()
  return (
    <SiteShell>
      <section className="py-24 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-amber-700 font-semibold">Contact us</span>
            <h1 className="font-serif text-4xl md:text-6xl font-medium text-slate-900 mt-3 leading-[1.05] tracking-tight">
              Let&apos;s plan something <span className="italic">unforgettable.</span>
            </h1>
            <p className="mt-6 text-slate-600 text-lg leading-relaxed max-w-lg">
            Have questions before booking? Contact us on WhatsApp and our team will be happy to assist you. We'll help you choose the best tours, customize your itinerary, arrange private trips, and provide the best available rates. Traveling with family, friends, or a larger group? Ask us about special discounts and package deals.  
            </p>
            <div className="mt-8">
              <WhatsAppButton label="Message us on WhatsApp" message="Hello Kayasa! I would like to plan a Bali trip." />
            </div>

            <div className="mt-14 space-y-5">
              {s.whatsappNumber && (
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center"><Phone size={16} /></div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">WhatsApp</div>
                    <div className="text-[15px] text-slate-900 font-medium mt-0.5">+{s.whatsappNumber}</div>
                  </div>
                </div>
              )}
              {s.email && (
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center"><Mail size={16} /></div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">Email</div>
                    <div className="text-[15px] text-slate-900 font-medium mt-0.5">{s.email}</div>
                  </div>
                </div>
              )}
              {s.address && (
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center"><MapPin size={16} /></div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">Office</div>
                    <div className="text-[15px] text-slate-900 font-medium mt-0.5">{s.address}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10 flex gap-2">
              {s.instagram && (
                <a href={s.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-white ring-1 ring-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white flex items-center justify-center transition shadow-soft"><Instagram size={16} /></a>
              )}
              {s.facebook && (
                <a href={s.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-white ring-1 ring-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white flex items-center justify-center transition shadow-soft"><Facebook size={16} /></a>
              )}
            </div>
          </div>

          <div className="relative bg-slate-950 rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-soft-lg">
            <div className="absolute -top-12 -right-12 w-72 h-72 bg-amber-500/10 blur-3xl rounded-full" />
            <div className="absolute inset-0 opacity-[0.04] bg-grid-slate pointer-events-none" />
            <MessageCircle className="relative text-amber-400 mb-5" size={32} />
            <h2 className="relative font-serif text-2xl md:text-3xl font-medium mb-5 tracking-tight">Why WhatsApp?</h2>
            <ul className="relative space-y-3 text-white/80 text-[14px] leading-relaxed">
              <li className="flex gap-2.5"><span className="text-amber-400">/</span> Get answers in minutes, not hours.</li>
              <li className="flex gap-2.5"><span className="text-amber-400">/</span> Share photos &amp; screenshots of itineraries.</li>
              <li className="flex gap-2.5"><span className="text-amber-400">/</span> Easily customize tours in real-time.</li>
              <li className="flex gap-2.5"><span className="text-amber-400">/</span> Bookings confirmed instantly  no forms, no waiting.</li>
              <li className="flex gap-2.5"><span className="text-amber-400">/</span> Reach us 7 days a week, 8 AM  10 PM Bali time.</li>
            </ul>
            <div className="relative mt-10">
              <WhatsAppButton label="Start a chat" message="Hello Kayasa!" />
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
