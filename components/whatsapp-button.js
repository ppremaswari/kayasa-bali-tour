import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export default function WhatsAppButton({ message, label = 'Book via WhatsApp', size = 'lg', variant = 'primary', className = '' }) {
  const url = buildWhatsAppUrl(message)
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition focus-ring'
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-[15px]',
  }
  const variants = {
    primary: 'bg-[#128C7E] hover:bg-[#0d6e63] text-white shadow-soft',
    outline: 'bg-white text-slate-900 ring-1 ring-slate-200 hover:ring-slate-300 hover:bg-slate-50 shadow-soft',
    dark: 'bg-slate-900 hover:bg-slate-800 text-white shadow-soft',
  }
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      <MessageCircle size={size === 'lg' ? 18 : 15} />
      {label}
    </Link>
  )
}

export function WhatsAppFloating() {
  const url = buildWhatsAppUrl('Hello! I would like to know more about your Bali tours.')
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 w-13 h-13 px-4 py-3 rounded-full bg-[#128C7E] hover:bg-[#0d6e63] shadow-elevated flex items-center justify-center gap-2 text-white text-sm font-semibold animate-bounce-slow ring-2 ring-white/20"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">Chat</span>
    </Link>
  )
}
