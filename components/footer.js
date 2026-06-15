import Link from 'next/link'
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer({ settings }) {
  const s = settings || {}
  return (
    <footer className="bg-emerald-950 text-emerald-50 mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold">K</div>
            <span className="font-serif text-xl">{s.companyName || 'Kayasa Bali Tour'}</span>
          </div>
          <p className="text-emerald-200 max-w-md leading-relaxed">
            {s.companyDescription || 'Authentic, hand-crafted Bali experiences led by passionate local guides.'}
          </p>
          <div className="flex gap-3 mt-6">
            {s.instagram && (
              <a href={s.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center">
                <Instagram size={18} />
              </a>
            )}
            {s.facebook && (
              <a href={s.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center">
                <Facebook size={18} />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-emerald-100">Explore</h3>
          <ul className="space-y-2 text-emerald-200">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/activities" className="hover:text-white">All Activities</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-emerald-100">Get in touch</h3>
          <ul className="space-y-3 text-emerald-200 text-sm">
            {s.whatsappNumber && (
              <li className="flex items-start gap-2"><Phone size={16} className="mt-0.5" /><span>+{s.whatsappNumber}</span></li>
            )}
            {s.email && (
              <li className="flex items-start gap-2"><Mail size={16} className="mt-0.5" /><span>{s.email}</span></li>
            )}
            {s.address && (
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5" /><span>{s.address}</span></li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row gap-2 items-center justify-between text-xs text-emerald-300">
          <p>(c) {new Date().getFullYear()} {s.companyName || 'Kayasa Bali Tour'}. All rights reserved.</p>
          <p>Crafted with love in Bali  /  <Link href="/studio" className="hover:text-white underline">Admin</Link></p>
        </div>
      </div>
    </footer>
  )
}
