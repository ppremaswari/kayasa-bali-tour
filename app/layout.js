import './globals.css'
import { Providers } from './providers'
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata = {
  title: {
    default: 'Kayasa Bali Tour | Authentic Bali Experiences',
    template: '%s | Kayasa Bali Tour',
  },
  description: 'Discover Bali through hand-crafted tours: sunrise volcano treks, sacred temples, jungle waterfalls and island adventures led by local guides.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  openGraph: {
    title: 'Kayasa Bali Tour',
    description: 'Authentic, hand-crafted Bali experiences led by passionate local guides.',
    type: 'website',
  },
    icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);' }} />
      </head>
      <body className="font-sans antialiased bg-stone-50 text-emerald-950">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
