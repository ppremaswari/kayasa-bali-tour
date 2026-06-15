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
      <section className="relative pt-16 pb-12 bg-gradient-to-b from-emerald-900 to-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-emerald-300 font-semibold">Our Tours</span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mt-3">Bali Activities</h1>
          <p className="mt-4 text-emerald-100/90 max-w-2xl mx-auto">From sunrise volcanoes to sacred temples  discover the experience that&apos;s right for you.</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ActivitiesGrid activities={activities} categories={categories} />
        </div>
      </section>
    </SiteShell>
  )
}
