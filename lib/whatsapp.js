export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281237656995'

export function buildWhatsAppUrl(message) {
  const txt = encodeURIComponent(message || 'Hello, I am interested in your Bali tours.')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${txt}`
}

export function formatPrice(value) {
  if (value === undefined || value === null) return ''
  return `$${Number(value).toLocaleString('en-US')}`
}
