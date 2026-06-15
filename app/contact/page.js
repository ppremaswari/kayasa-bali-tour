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
      <section className="py-20 md:py-24 bg-gradient-to-b from-emerald-50/40 to-stone-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-700 font-semibold">Contact us</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-emerald-950 mt-2 leading-tight">
              Let&apos;s plan something <span className="italic text-emerald-700">unforgettable.</span>
            </h1>
            <p className="mt-5 text-emerald-900/80 text-lg leading-relaxed">
              Drop us a message on WhatsApp and our team will reply within minutes  even on Sundays. We&apos;ll help you choose tours, customize itineraries, or just answer your Bali questions.
            </p>
            <div className="mt-7">
              <WhatsAppButton label="Message us on WhatsApp" message="Hello Kayasa! I would like to plan a Bali trip." />
            </div>

            <div className="mt-12 space-y-5">
              {s.whatsappNumber && (
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center"><Phone size={18} /></div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-emerald-700/70 font-semibold">WhatsApp</div>
                    <div className="text-lg text-emerald-950 font-semibold">+{s.whatsappNumber}</div>
                  </div>
                </div>
              )}
              {s.email && (
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center"><Mail size={18} /></div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-emerald-700/70 font-semibold">Email</div>
                    <div className="text-lg text-emerald-950 font-semibold">{s.email}</div>
                  </div>
                </div>
              )}
              {s.address && (
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center"><MapPin size={18} /></div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-emerald-700/70 font-semibold">Office</div>
                    <div className="text-lg text-emerald-950 font-semibold">{s.address}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10 flex gap-3">
              {s.instagram && (
                <a href={s.instagram} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white ring-1 ring-emerald-200 text-emerald-700 hover:bg-emerald-700 hover:text-white flex items-center justify-center transition"><Instagram size={18} /></a>
              )}
              {s.facebook && (
                <a href={s.facebook} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white ring-1 ring-emerald-200 text-emerald-700 hover:bg-emerald-700 hover:text-white flex items-center justify-center transition"><Facebook size={18} /></a>
              )}
            </div>
          </div>

          <div className="relative bg-emerald-950 rounded-3xl p-8 md:p-12 text-white overflow-hidden">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-700/30 blur-3xl rounded-full" />
            <MessageCircle className="text-emerald-300 mb-4" size={36} />
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 relative">Why WhatsApp?</h2>
            <ul className="space-y-3 text-emerald-100/90 text-sm leading-relaxed relative">
              <li>Get answers in minutes, not hours.</li>
              <li>Share photos & screenshots of itineraries.</li>
              <li>Easily customize tours in real-time.</li>
              <li>Bookings confirmed instantly  no forms, no waiting.</li>
              <li>Reach us 7 days a week, 8 AM  10 PM (Bali time).</li>
            </ul>
            <div className="mt-8">
              <WhatsAppButton variant="outline" label="Start a chat" message="Hello Kayasa!" />
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
