const FALLBACK_RATE = 15850   // June 2026 typical USD->IDR
const CACHE_TTL_MS = 12 * 60 * 60 * 1000  // 12 hours
const API_URL = 'https://open.er-api.com/v6/latest/USD'

let cache = {
  rate: FALLBACK_RATE,
  fetchedAt: 0,
  source: 'fallback',
}

export async function getExchangeRate() {
  const now = Date.now()
  if (cache.fetchedAt && now - cache.fetchedAt < CACHE_TTL_MS) {
    return cache
  }
  try {
    const res = await fetch(API_URL, { next: { revalidate: 43200 } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const rate = data?.rates?.IDR
    if (typeof rate === 'number' && rate > 1000) {
      cache = {
        rate,
        fetchedAt: now,
        source: 'open.er-api.com',
      }
    }
  } catch (e) {
    console.warn('[currency] Exchange rate fetch failed, using cached/fallback:', e?.message)
    // Keep previous cache (or fallback if first run); update fetchedAt to throttle retries
    cache = { ...cache, fetchedAt: now }
  }
  return cache
}

/* ---------- Formatters ---------- */

const idrFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

const idrNumberFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 0,
})

/**
 * Format an IDR amount.
 * @param {number} idrAmount - amount already in IDR
 */
export function formatIDR(idrAmount) {
  if (idrAmount === undefined || idrAmount === null || isNaN(idrAmount)) return ''
  // Intl outputs \"Rp1.500.000\" (no space). Insert a thin space after Rp for readability.
  return idrFormatter.format(idrAmount).replace(/^Rp/, 'Rp\u00A0')
}

/**
 * Convert USD -> IDR -> formatted string.
 */
export function formatUSDtoIDR(usdAmount, rate) {
  if (usdAmount === undefined || usdAmount === null) return ''
  const idr = Math.round(Number(usdAmount) * (rate || FALLBACK_RATE))
  // Round to nearest thousand for cleaner display (e.g., Rp 713.000 instead of Rp 712.250)
  const rounded = Math.round(idr / 1000) * 1000
  return formatIDR(rounded)
}

/**
 * Format compact IDR for large values:
 *   1_200_000          -> \"Rp 1,2 Juta\"
 *   1_200_000_000      -> \"Rp 1,2 Miliar\"
 *   2_400_000_000_000  -> \"Rp 2,4 Triliun\"
 */
export function formatIDRCompact(idrAmount) {
  if (idrAmount === undefined || idrAmount === null || isNaN(idrAmount)) return ''
  const n = Number(idrAmount)
  const abs = Math.abs(n)
  let value, unit
  if (abs >= 1_000_000_000_000) { value = n / 1_000_000_000_000; unit = 'Triliun' }
  else if (abs >= 1_000_000_000)  { value = n / 1_000_000_000;     unit = 'Miliar' }
  else if (abs >= 1_000_000)      { value = n / 1_000_000;         unit = 'Juta' }
  else if (abs >= 1_000)          { value = n / 1_000;             unit = 'Ribu' }
  else                            { return formatIDR(n) }
  const formatted = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 }).format(value)
  return `Rp\u00A0${formatted} ${unit}`
}

/**
 * Convert USD -> IDR (raw number, no formatting).
 */
export function usdToIdr(usdAmount, rate) {
  if (usdAmount === undefined || usdAmount === null) return 0
  return Math.round(Number(usdAmount) * (rate || FALLBACK_RATE))
}

/**
 * Human readable timestamp like \"updated 3h ago\"
 */
export function formatRateAge(fetchedAt) {
  if (!fetchedAt) return 'belum diperbarui'
  const diffMs = Date.now() - fetchedAt
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'baru saja'
  if (mins < 60) return `${mins} menit lalu`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} jam lalu`
  const days = Math.floor(hours / 24)
  return `${days} hari lalu`
}

export function formatUSD(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}