import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import WhatsAppButton from '@/components/whatsapp-button'

export default function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-slate-950">
      <Image
        src="https://images.unsplash.com/photo-1523539693385-e5e891eb4465?w=2400&q=80"
        alt="Bali rice terraces at golden hour"
        fill
        priority
        className="object-cover opacity-90"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/50 to-slate-950/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent" />

      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col justify-end pb-20 md:pb-28">
        <div className="max-w-3xl text-white animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/8 backdrop-blur-md border border-white/15 text-white/90 text-[11px] font-medium uppercase tracking-[0.22em] px-4 py-1.5 mb-7">
            <Sparkles size={13} className="text-amber-400" /> Hand-crafted since 2014
          </span>
          <h1 className="font-serif text-[44px] md:text-7xl lg:text-[88px] font-medium leading-[0.98] tracking-[-0.02em]">
            The Bali you&apos;ve been<br className="hidden md:block" />
            <span className="italic text-gradient-gold">imagining</span>
            <span className="text-white">.</span>
          </h1>
          <p className="mt-7 text-lg md:text-xl text-white/75 max-w-xl leading-relaxed font-light">
            Sunrise volcanoes, sacred temples, jungle waterfalls and turquoise islands  curated by guides who call this island home.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/activities" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-slate-900 hover:bg-slate-100 px-7 py-3.5 text-[15px] font-semibold shadow-elevated transition">
              Explore the journeys <ArrowRight size={17} />
            </Link>
            <WhatsAppButton label="Chat on WhatsApp" message="Hello! I'd love to plan a Bali trip with Kayasa." variant="outline" />
          </div>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 text-white/80 text-sm">
            <div>
              <div className="font-serif text-2xl text-white">10+</div>
              <div className="text-xs uppercase tracking-wider text-white/50">Years guiding</div>
            </div>
            <div className="hidden sm:block w-px bg-white/15" />
            <div>
              <div className="font-serif text-2xl text-white">4.9<span className="text-amber-400">/5</span></div>
              <div className="text-xs uppercase tracking-wider text-white/50">Traveller rating</div>
            </div>
            <div className="hidden sm:block w-px bg-white/15" />
            <div>
              <div className="font-serif text-2xl text-white">40+</div>
              <div className="text-xs uppercase tracking-wider text-white/50">Countries visited us</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
