export const metadata = {
  title: 'Kayasa Bali Tour Studio',
  robots: { index: false },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function StudioLayout({ children }) {
  return <div style={{ height: '100vh' }}>{children}</div>
}
