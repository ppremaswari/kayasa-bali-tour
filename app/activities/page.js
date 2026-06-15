import SiteShell from '@/components/site-shell'
import ActivitiesGrid from './activities-grid'
import { getAllActivities, getAllCategories } from '@/sanity/lib/fetch'

export const revalidate = 60
export const metadata = {
  title: 'All Bali Activities & Tours',
  description: 'Browse all of our hand-crafted Bali tours  adventure, cultural, nature, beach and wellness experiences.',
}

export default async function ActivitiesPage() {
  const [activities, categories] = await Promise.all([getAllActivities(), getAllCategories()])

  return (
    <SiteShell>
     <section className="relative pt-24 pb-16 bg-slate-950 border-b border-white/10">
  <div className="max-w-7xl mx-auto px-4 md:px-6 max-w-3xl">
    <span className="text-[11px] uppercase tracking-[0.22em] text-amber-500 font-semibold">
      Our tours
    </span>

    <h1 className="font-serif text-4xl md:text-6xl font-medium text-white mt-3 tracking-tight leading-tight">
      Bali activities, <span className="italic text-slate-200">curated.</span>
    </h1>

    <p className="mt-5 text-slate-400 max-w-xl text-lg leading-relaxed">
      From sunrise volcanoes to sacred temples discover the experience that&apos;s right for you.
    </p>
  </div>
</section>

      <section className="py-12 md:py-16 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ActivitiesGrid activities={activities} categories={categories} />
        </div>
      </section>
    </SiteShell>
  )
}
