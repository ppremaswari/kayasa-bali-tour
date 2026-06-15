'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const CurrencyContext = createContext(null)

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('USD')

  useEffect(() => {
    const saved = localStorage.getItem('currency')
    if (saved) setCurrency(saved)
  }, [])

  const toggleCurrency = () => {
    const next = currency === 'USD' ? 'IDR' : 'USD'

    setCurrency(next)
    localStorage.setItem('currency', next)
  }

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        toggleCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext)

  if (!ctx) {
    throw new Error('useCurrency must be used inside CurrencyProvider')
  }

  return ctx
}