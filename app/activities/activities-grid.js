'use client'

import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
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
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search activities, location..."
            className="w-full pl-10 pr-9 py-2.5 rounded-lg bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-800/30 focus:outline-none placeholder-slate-400 text-slate-900 text-sm shadow-soft transition"
          />
          {q && (
            <button onClick={() => setQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"><X size={15} /></button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setCat('all')}
            className={`px-3.5 py-1.5 rounded-md text-[12.5px] font-medium transition ${cat === 'all' ? 'bg-slate-900 text-white shadow-soft' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'}`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c._id}
              onClick={() => setCat(c.slug?.current)}
              className={`px-3.5 py-1.5 rounded-md text-[12.5px] font-medium transition ${cat === c.slug?.current ? 'bg-slate-900 text-white shadow-soft' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'}`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 text-sm text-slate-500">
        <span><span className="font-medium text-slate-900">{filtered.length}</span> {filtered.length === 1 ? 'activity' : 'activities'}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl ring-1 ring-slate-200 shadow-soft">
          <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto mb-4 flex items-center justify-center"><Search size={20} className="text-slate-400" /></div>
          <h3 className="font-serif text-xl text-slate-900 mb-1">Nothing matches your search</h3>
          <p className="text-sm text-slate-500">Try clearing filters or searching with different keywords.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => <ActivityCard key={a._id} activity={a} />)}
        </div>
      )}
    </div>
  )
}
