export function formatUSD(amount) {
  if (amount === undefined || amount === null) return ''

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatIDR(idrAmount) {
  if (idrAmount === undefined || idrAmount === null || isNaN(idrAmount)) {
    return ''
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  })
    .format(idrAmount)
    .replace(/^Rp/, 'Rp ')
}

export function formatUSDtoIDR(usdAmount, rate) {
  const idr = Math.round(Number(usdAmount) * rate)
  return formatIDR(idr)
}