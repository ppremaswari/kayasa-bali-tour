import Link from 'next/link'
import { Instagram, Facebook, Mail, MapPin, Phone, RefreshCw } from 'lucide-react'
import { getExchangeRate, formatRateAge } from '@/lib/currency'
import CurrencyToggle from './currency-toggle'

export default async function Footer({ settings }) {
  const s = settings || {}
  const exchange = await getExchangeRate()
  const rateFormatted = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(exchange.rate)

  return (
    <footer className="relative bg-slate-950 text-slate-300 mt-24">
      <div className="absolute inset-0 opacity-[0.04] bg-grid-slate pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-10 h-10 rounded-lg bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-white font-serif text-lg">K</div>
            <div className="leading-tight">
              <div className="font-serif text-lg text-white">{s.companyName || 'Kayasa Bali Tour'}</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Bali Travel Atelier</div>
            </div>
          </div>
          <p className="text-slate-400 max-w-md leading-relaxed text-sm">
            {s.companyDescription || 'Pengalaman Bali otentik yang dirancang dengan tangan oleh pemandu lokal yang passionate.'}
          </p>
          <div className="flex gap-2 mt-6">
            {s.instagram && (
              <a href={s.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 ring-1 ring-white/10 flex items-center justify-center text-slate-300 hover:text-white transition">
                <Instagram size={16} />
              </a>
            )}
            {s.facebook && (
              <a href={s.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 ring-1 ring-white/10 flex items-center justify-center text-slate-300 hover:text-white transition">
                <Facebook size={16} />
              </a>
            )}
          </div>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-semibold mb-4">Explore</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="text-slate-300 hover:text-white transition">Home</Link></li>
            <li><Link href="/activities" className="text-slate-300 hover:text-white transition">All Activities</Link></li>
            <li><Link href="/about" className="text-slate-300 hover:text-white transition">About Us</Link></li>
            <li><Link href="/contact" className="text-slate-300 hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-slate-300 text-sm">
            {s.whatsappNumber && (
              <li className="flex items-start gap-2.5"><Phone size={15} className="mt-0.5 text-amber-500" /><span>+{s.whatsappNumber}</span></li>
            )}
            {s.email && (
              <li className="flex items-start gap-2.5"><Mail size={15} className="mt-0.5 text-amber-500" /><span>{s.email}</span></li>
            )}
            {s.address && (
              <li className="flex items-start gap-2.5"><MapPin size={15} className="mt-0.5 text-amber-500" /><span>{s.address}</span></li>
            )}
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-slate-500">
          <p>(c) {new Date().getFullYear()} {s.companyName || 'Kayasa Bali Tour'}. Semua hak dilindungi.</p>
          <div className="flex items-center gap-4">
            <CurrencyToggle />
            <span className="inline-flex items-center gap-1.5" title={`Sumber: ${exchange.source}`}>
              <RefreshCw size={11} className="text-amber-500" />
              1 USD &asymp; Rp&nbsp;{rateFormatted}
              <span className="text-slate-600">  diperbarui {formatRateAge(exchange.fetchedAt)}</span>
            </span>
            <Link href="/studio" className="hover:text-white underline-offset-4 hover:underline">Studio</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
