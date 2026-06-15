import Image from 'next/image'
import Link from 'next/link'
import { Clock, MapPin, Star } from 'lucide-react'
import { imageUrl } from '@/sanity/lib/image'
import { formatPrice } from '@/lib/whatsapp'

export default function ActivityCard({ activity }) {
  const { title, slug, shortDescription, price, duration, location, featured, coverImage, category } = activity
  const src = imageUrl(coverImage, 800)
  const href = `/activities/${slug?.current}`

  return (
    <Link href={href} className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl ring-1 ring-emerald-100 hover:ring-emerald-200 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-emerald-50">
        {src && (
          <Image src={src} alt={coverImage?.alt || title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw" />
        )}
        {featured && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 shadow">
            <Star size={12} fill="currentColor" /> Featured
          </span>
        )}
        {category?.title && (
          <span className="absolute top-3 right-3 rounded-full bg-white/95 backdrop-blur text-emerald-900 text-[11px] font-semibold uppercase tracking-wider px-3 py-1">
            {category.title}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-serif text-lg md:text-xl font-semibold text-emerald-950 leading-tight group-hover:text-emerald-700 transition">
          {title}
        </h3>
        <p className="text-sm text-emerald-800/80 line-clamp-2 flex-1">{shortDescription}</p>

        <div className="flex items-center gap-4 text-xs text-emerald-700/80 pt-1">
          {duration && <span className="inline-flex items-center gap-1"><Clock size={13} />{duration}</span>}
          {location && <span className="inline-flex items-center gap-1"><MapPin size={13} />{location}</span>}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-emerald-100 mt-1">
          <div>
            <span className="text-[11px] uppercase tracking-wide text-emerald-700/70">From</span>
            <div className="font-serif text-xl font-bold text-emerald-900">{formatPrice(price)}<span className="text-xs font-normal text-emerald-700/70"> / person</span></div>
          </div>
          <span className="text-sm font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">View ?</span>
        </div>
      </div>
    </Link>
  )
}
