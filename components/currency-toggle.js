'use client'

import { useCurrency } from '@/app/currency-provider'

export default function CurrencyToggle() {
  const { currency, toggleCurrency } = useCurrency()

  return (
    <button
      onClick={toggleCurrency}
      className="
        flex items-center
        rounded-full
        border border-white/10
        bg-white/5
        p-1
        text-[11px]
      "
    >
      <div
        className={`
          px-2 py-1 rounded-full transition
          ${currency === 'USD'
            ? 'bg-amber-500 text-black'
            : 'text-slate-400'}
        `}
      >
        USD
      </div>

      <div
        className={`
          px-2 py-1 rounded-full transition
          ${currency === 'IDR'
            ? 'bg-amber-500 text-black'
            : 'text-slate-400'}
        `}
      >
        IDR
      </div>
    </button>
  )
}