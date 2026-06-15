'use client'

import { useCurrency } from '@/app/currency-provider'
import { formatUSD, formatUSDtoIDR } from '@/lib/currency'

export default function PriceDisplay({
  priceUSD,
  exchangeRate,
}) {
  const { currency } = useCurrency()

  return currency === 'USD'
    ? formatUSD(priceUSD)
    : formatUSDtoIDR(priceUSD, exchangeRate)
}