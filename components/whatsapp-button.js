import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export default function WhatsAppButton({ message, label = 'Book via WhatsApp', size = 'lg', variant = 'primary', className = '' }) {
  const url = buildWhatsAppUrl(message)
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition shadow-md'
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }
  const variants = {
    primary: 'bg-[#25D366] hover:bg-[#1eba57] text-white',
    outline: 'bg-white text-[#128C7E] border-2 border-[#25D366] hover:bg-emerald-50',
    dark: 'bg-emerald-950 hover:bg-emerald-900 text-white',
  }
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      <MessageCircle size={size === 'lg' ? 20 : 16} />
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
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1eba57] shadow-2xl flex items-center justify-center text-white animate-bounce-slow"
    >
      <MessageCircle size={26} />
    </Link>
  )
}
