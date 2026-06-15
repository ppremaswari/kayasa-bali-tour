export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281237656995'

export function buildWhatsAppUrl(message) {
  const txt = encodeURIComponent(message || 'Halo, saya tertarik dengan tour Bali Anda.')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${txt}`
}

// Legacy export kept for backward compatibility, now formats IDR.
// Prefer importing formatUSDtoIDR from '@/lib/currency'.
export { formatUSDtoIDR as formatPrice } from '@/lib/currency'
