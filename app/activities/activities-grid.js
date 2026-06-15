'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import ActivityCard from '@/components/activity-card'

export default function ActivitiesGrid({ activities = [], categories = [] }) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return activities.filter((a) => {
      const matchesQ = !needle ||
        a.title?.toLowerCase().includes(needle) ||
        a.location?.toLowerCase().includes(needle) ||
        a.shortDescription?.toLowerCase().includes(needle)
      const matchesCat = cat === 'all' || a.category?.slug?.current === cat
      return matchesQ && matchesCat
    })
  }, [activities, q, cat])

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600" size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search activities, location..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white ring-1 ring-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-emerald-400 text-emerald-950"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCat('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${cat === 'all' ? 'bg-emerald-700 text-white shadow' : 'bg-white text-emerald-800 ring-1 ring-emerald-200 hover:bg-emerald-50'}`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c._id}
              onClick={() => setCat(c.slug?.current)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${cat === c.slug?.current ? 'bg-emerald-700 text-white shadow' : 'bg-white text-emerald-800 ring-1 ring-emerald-200 hover:bg-emerald-50'}`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-emerald-700">
          No activities match your search. Try clearing filters.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => <ActivityCard key={a._id} activity={a} />)}
        </div>
      )}
    </div>
  )
}
