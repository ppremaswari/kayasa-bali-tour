'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { imageUrl } from '@/sanity/lib/image'

export default function GalleryCarousel({ images = [], title = '' }) {
  const [idx, setIdx] = useState(0)
  if (!images?.length) return null
  const urls = images.map((img) => imageUrl(img, 1600)).filter(Boolean)
  const next = () => setIdx((i) => (i + 1) % urls.length)
  const prev = () => setIdx((i) => (i - 1 + urls.length) % urls.length)

  return (
    <div className="w-full">
      <div className="relative aspect-[16/10] md:aspect-[16/8] rounded-2xl overflow-hidden bg-emerald-50 shadow-xl">
        {urls.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`${title} image ${i + 1}`}
            fill
            priority={i === 0}
            sizes="(min-width:1024px) 1000px, 100vw"
            className={`object-cover transition-opacity duration-500 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        {urls.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-emerald-950 flex items-center justify-center shadow">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-emerald-950 flex items-center justify-center shadow">
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {urls.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Go to slide ${i + 1}`} className={`h-2 rounded-full transition-all ${i === idx ? 'w-8 bg-white' : 'w-2 bg-white/60 hover:bg-white/80'}`} />
              ))}
            </div>
          </>
        )}
      </div>
      {urls.length > 1 && (
        <div className="mt-3 grid grid-cols-4 md:grid-cols-6 gap-2">
          {urls.map((src, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`relative aspect-[4/3] rounded-lg overflow-hidden ring-2 ${i === idx ? 'ring-emerald-500' : 'ring-transparent'} hover:ring-emerald-300 transition`}>
              <Image src={src} alt="" fill sizes="150px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
