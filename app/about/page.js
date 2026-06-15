import Image from 'next/image'
import SiteShell from '@/components/site-shell'
import WhatsAppButton from '@/components/whatsapp-button'
import { Heart, Map, ShieldCheck, Users } from 'lucide-react'
import { getSiteSettings } from '@/sanity/lib/fetch'

export const metadata = {
  title: 'About Us',
  description: 'Meet the local team behind Kayasa Bali Tour. Born and raised in Bali, we share the island we love with every traveller.',
}

export default async function AboutPage() {
  const settings = await getSiteSettings()
  return (
    <SiteShell>
      <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden bg-slate-950">
        <Image src="https://images.unsplash.com/photo-1599117372663-d68b2e2189d7?w=2000&q=80" alt="Bali coast" fill priority className="object-cover opacity-80" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950" />
        <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col justify-end pb-14 text-white">
          <span className="text-[11px] uppercase tracking-[0.22em] text-amber-400 font-semibold">About Kayasa</span>
          <h1 className="font-serif text-4xl md:text-7xl font-medium mt-3 leading-[1.02] tracking-tight max-w-3xl">Local hearts. <span className="italic text-gradient-gold">Open arms.</span></h1>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-slate-700">
          <p className="text-xl md:text-2xl font-serif leading-relaxed text-slate-900 mb-10">
            Kayasa was born from a simple idea: <span className="italic">travellers deserve more than a checklist.</span> They deserve a friend in Bali.
          </p>
          <div className="space-y-6 text-[16.5px] leading-relaxed">
            <p>{settings.companyDescription}</p>
            <p>Our family-run company has been showing visitors around Bali for over a decade. Every guide on our team was born here  many in the same villages we&apos;ll take you to. We speak the language, know the priests at the temples, and we&apos;ll tell you when the sunrise viewpoint is too crowded and where to go instead.</p>
            <p>We believe small groups create big memories. We never pile travellers into massive coaches. We use comfortable private cars, take the back roads, and leave room in every itinerary for the unexpected.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50/60 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid gap-px bg-slate-200 rounded-2xl overflow-hidden ring-1 ring-slate-200 md:grid-cols-4">
          {[
            { icon: Heart, label: 'Born in Bali', desc: 'Our guides are 100% local' },
            { icon: Users, label: 'Small groups', desc: 'Max 8 travellers per tour' },
            { icon: ShieldCheck, label: 'Fully insured', desc: 'Licensed drivers, safety first' },
            { icon: Map, label: '500+ trips', desc: 'Crafted across the island' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-white p-7 text-center">
              <div className="w-11 h-11 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center mx-auto mb-4"><Icon size={18} /></div>
              <div className="font-serif text-lg font-semibold text-slate-900">{label}</div>
              <div className="text-[13px] text-slate-500 mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 text-center bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-slate-900 mb-5 tracking-tight">Come say hello on WhatsApp.</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">We reply within minutes  even on island time. Tell us your dates and dreams.</p>
          <WhatsAppButton label="Chat on WhatsApp" message="Hi Kayasa! I'd love to hear more about your tours." />
        </div>
      </section>
    </SiteShell>
  )
}
