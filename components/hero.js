import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import WhatsAppButton from '@/components/whatsapp-button'

export default function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1523539693385-e5e891eb4465?w=2400&q=80"
        alt="Bali rice terraces at golden hour"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-emerald-950/40 to-emerald-950/80" />

      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col justify-end pb-16 md:pb-24">
        <div className="max-w-3xl text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/20 backdrop-blur border border-emerald-300/30 text-emerald-100 text-xs font-medium uppercase tracking-widest px-4 py-1.5 mb-6">
            <Sparkles size={14} /> Hand-crafted Bali experiences
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Discover the soul of Bali, <br className="hidden md:block" />
            <span className="text-emerald-300 italic">your way.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-emerald-50/90 max-w-2xl leading-relaxed">
            Sunrise volcanoes, sacred temples, jungle waterfalls and turquoise islands  carefully curated by local guides who call Bali home.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/activities" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-emerald-900 hover:bg-emerald-50 px-7 py-3.5 font-semibold shadow-lg transition">
              Explore Tours <ArrowRight size={18} />
            </Link>
            <WhatsAppButton label="Chat on WhatsApp" message="Hello! I'd love to plan a Bali trip with Kayasa." />
          </div>
        </div>
      </div>
    </section>
  )
}
