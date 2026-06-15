import Image from 'next/image'
import Link from 'next/link'
import { Clock, MapPin, Star, ArrowUpRight } from 'lucide-react'
import { imageUrl } from '@/sanity/lib/image'
import { formatUSDtoIDR } from '@/lib/currency'
import { getExchangeRate } from '@/lib/currency'
import PriceDisplay from './price-display'

export default async function ActivityCard({ activity, rate }) {
  // Fetch rate if not passed (allows usage from any server component)
  const exchange = rate ? { rate } : await getExchangeRate()
  const { title, slug, shortDescription, price, duration, location, featured, coverImage, category } = activity
  const src = imageUrl(coverImage, 800)
  const href = `/activities/${slug?.current}`

  return (
    <Link href={href} className="group relative flex flex-col bg-white rounded-2xl overflow-hidden ring-1 ring-slate-200 hover:ring-slate-300 shadow-soft hover:shadow-soft-lg transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {src && (
          <Image src={src} alt={coverImage?.alt || title} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-700" sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
        {featured && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-md bg-amber-50 text-amber-800 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 ring-1 ring-amber-200/80 shadow-soft">
            <Star size={11} className="fill-amber-600 text-amber-600" /> Unggulan
          </span>
        )}
        {category?.title && (
          <span className="absolute top-3 right-3 rounded-md bg-white/95 backdrop-blur text-slate-700 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 ring-1 ring-slate-200/80">
            {category.title}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-serif text-[19px] md:text-xl font-semibold text-slate-900 leading-[1.2] tracking-tight">
          {title}
        </h3>
        <p className="text-[13.5px] text-slate-600 line-clamp-2 flex-1 leading-relaxed">{shortDescription}</p>

        <div className="flex items-center gap-4 text-[12px] text-slate-500 pt-1">
          {duration && <span className="inline-flex items-center gap-1.5"><Clock size={12.5} className="text-slate-400" />{duration}</span>}
          {location && <span className="inline-flex items-center gap-1.5"><MapPin size={12.5} className="text-slate-400" />{location}</span>}
        </div>

        <div className="flex items-end justify-between pt-4 mt-1 border-t border-slate-100">
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-medium">Start from</div>
            <div className="font-serif text-[20px] md:text-[22px] font-semibold text-slate-900 leading-none mt-1"><PriceDisplay
              priceUSD={price}
              exchangeRate={exchange.rate}
            />
            <span className="text-[11px] font-normal text-slate-500 ml-1">/ pax</span></div>
          </div>
          <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-slate-900 group-hover:text-emerald-800 transition">
            Detail <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </span>
        </div>
      </div>
    </Link>
  )
}
