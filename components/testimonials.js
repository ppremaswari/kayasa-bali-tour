import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { imageUrl } from '@/sanity/lib/image'

export default function Testimonials({ items = [] }) {
  if (!items.length) return null
  return (
    <section className="py-24 md:py-32 bg-slate-50/70 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500 font-semibold">Testimonials</span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-slate-900 mt-3 tracking-tight">Loved by travellers worldwide.</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="flex gap-0.5">{[0,1,2,3,4].map(i => <Star key={i} size={15} className="text-amber-500 fill-amber-500" />)}</div>
            <span><span className="font-semibold text-slate-900">4.9</span> / 5  from <span className="font-semibold text-slate-900">800+</span> reviews</span>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((t) => {
            const src = imageUrl(t.avatar, 200)
            return (
              <div key={t._id} className="relative bg-white rounded-2xl p-6 ring-1 ring-slate-200 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 transition">
                <Quote className="absolute top-5 right-5 text-slate-100" size={36} />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} size={13} className="text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed text-[13.5px] mb-6">&quot;{t.review}&quot;</p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  {src ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 ring-1 ring-slate-200">
                      <Image src={src} alt={t.customerName} fill className="object-cover" sizes="40px" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-medium text-sm">{t.customerName?.charAt(0)}</div>
                  )}
                  <div>
                    <div className="font-semibold text-slate-900 text-[13px]">{t.customerName}</div>
                    <div className="text-[11.5px] text-slate-500">{t.country}</div>
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
