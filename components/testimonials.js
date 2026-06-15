import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { imageUrl } from '@/sanity/lib/image'

export default function Testimonials({ items = [] }) {
  if (!items.length) return null
  return (
    <section className="py-20 md:py-28 bg-emerald-50/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-emerald-700 font-semibold">Testimonials</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-emerald-950 mt-2">Loved by travellers worldwide</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((t) => {
            const src = imageUrl(t.avatar, 200)
            return (
              <div key={t._id} className="relative bg-white rounded-2xl p-7 shadow-sm ring-1 ring-emerald-100 hover:shadow-lg transition">
                <Quote className="absolute top-5 right-5 text-emerald-100" size={42} />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-emerald-900/90 leading-relaxed text-sm mb-6">&quot;{t.review}&quot;</p>
                <div className="flex items-center gap-3">
                  {src && (
                    <div className="relative w-11 h-11 rounded-full overflow-hidden bg-emerald-100">
                      <Image src={src} alt={t.customerName} fill className="object-cover" sizes="44px" />
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-emerald-950 text-sm">{t.customerName}</div>
                    <div className="text-xs text-emerald-700/80">{t.country}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
