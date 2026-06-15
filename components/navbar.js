'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/activities', label: 'Activities' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar({ companyName = 'Kayasa Bali Tour' }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/95 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition">
            K
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-semibold text-emerald-950">{companyName}</span>
            <span className="text-[10px] uppercase tracking-widest text-emerald-700">Authentic Bali Experiences</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="px-4 py-2 text-sm font-medium text-emerald-900 hover:text-emerald-600 transition"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/activities"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 text-sm font-semibold shadow-sm transition"
          >
            Browse Tours
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md hover:bg-emerald-50 text-emerald-900"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={cn('md:hidden border-t border-emerald-100 bg-white overflow-hidden transition-all', open ? 'max-h-96' : 'max-h-0')}>
        <div className="flex flex-col p-4 gap-2">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 text-emerald-900"
            >
              {n.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
