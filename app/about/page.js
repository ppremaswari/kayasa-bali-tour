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
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1599117372663-d68b2e2189d7?w=2000&q=80" alt="Bali coast" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 to-emerald-950/80" />
        <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col justify-end pb-12 text-white">
          <span className="text-xs uppercase tracking-[0.3em] text-emerald-200 font-semibold">About Kayasa</span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mt-2 leading-tight max-w-2xl">Local hearts. <span className="italic text-emerald-300">Open arms.</span></h1>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-emerald-900">
          <p className="text-xl md:text-2xl font-serif leading-relaxed text-emerald-950 mb-8">
            Kayasa was born from a simple idea: travellers deserve more than a checklist. They deserve a friend in Bali.
          </p>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>{settings.companyDescription}</p>
            <p>
              Our family-run company has been showing visitors around Bali for over a decade. Every guide on our team was born here  many in the same villages we&apos;ll take you to. We speak the language, know the priests at the temples, and we&apos;ll be the first to tell you when the sunrise viewpoint is too crowded and where to go instead.
            </p>
            <p>
              We believe small groups create big memories. We never pile travellers into massive coaches. We use comfortable private cars, take the back roads, and leave room in every itinerary for the unexpected  the warung that smells too good to pass, the dance ceremony spotted from the road.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid gap-6 md:grid-cols-4">
          {[
            { icon: Heart, label: 'Born in Bali', desc: 'Our guides are 100% local' },
            { icon: Users, label: 'Small groups', desc: 'Max 8 travellers per tour' },
            { icon: ShieldCheck, label: 'Fully insured', desc: 'Licensed drivers, safety first' },
            { icon: Map, label: '500+ trips', desc: 'Crafted across the island' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-white rounded-2xl p-6 ring-1 ring-emerald-100 text-center">
              <Icon className="mx-auto text-emerald-600 mb-3" size={28} />
              <div className="font-serif text-xl font-bold text-emerald-950">{label}</div>
              <div className="text-sm text-emerald-700/80 mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-emerald-950 mb-4">Come say hello on WhatsApp.</h2>
          <p className="text-emerald-800 mb-7">We reply within minutes  even on island time. Tell us your dates and dreams.</p>
          <WhatsAppButton label="Chat on WhatsApp" message="Hi Kayasa! I'd love to hear more about your tours." />
        </div>
      </section>
    </SiteShell>
  )
}
