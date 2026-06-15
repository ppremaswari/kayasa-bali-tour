'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/', label: 'Home' },
  // { href: '/activities', label: 'Activities' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar({ companyName = 'Kayasa Bali Tour' }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={cn(
      'sticky top-0 z-40 w-full transition-all duration-200',
      scrolled ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-soft' : 'bg-white/60 backdrop-blur-md border-b border-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white font-serif text-lg shadow-soft ring-1 ring-slate-900/10 group-hover:ring-emerald-800/30 transition">
            K
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-600 ring-2 ring-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-[15px] font-semibold text-slate-900 tracking-tight">{companyName}</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-medium">Bali Travel Atelier</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="px-3.5 py-2 text-[13.5px] font-medium text-slate-700 hover:text-slate-900 rounded-md hover:bg-slate-100/70 transition"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/activities"
            className="ml-3 inline-flex items-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-[13px] font-semibold shadow-soft transition focus-ring"
          >
            Browse Tours
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md hover:bg-slate-100 text-slate-900"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={cn('md:hidden border-t border-slate-200 bg-white overflow-hidden transition-all', open ? 'max-h-96' : 'max-h-0')}>
        <div className="flex flex-col p-3 gap-1">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-md hover:bg-slate-100 text-slate-800 text-sm font-medium">
              {n.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
