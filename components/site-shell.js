import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { WhatsAppFloating } from '@/components/whatsapp-button'
import { getSiteSettings } from '@/sanity/lib/fetch'

export default async function SiteShell({ children }) {
  const settings = await getSiteSettings()
  return (
    <>
      <Navbar companyName={settings.companyName} />
      <main className="min-h-[60vh]">{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloating />
    </>
  )
}
