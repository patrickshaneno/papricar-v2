import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'PAPRICAR',
  description: 'Neuwagen & Gebrauchtwagen – fair. transparent. digital.',
  manifest: '/manifest.json',
  themeColor: '#8B5CF6',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: 'PAPRICAR',
    description: 'Neuwagen. Gebrauchtwagen. Direkt zum besten Angebot. Nur auf PAPRICAR.',
    images: [
      {
        url: '/preview.jpg',
        width: 1200,
        height: 630,
        alt: 'PAPRICAR - Der Marktplatz für Neuwagen & Gebrauchtwagen'
      }
    ],
    url: 'https://papricar.de',
    siteName: 'PAPRICAR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PAPRICAR',
    description: 'Neuwagen. Gebrauchtwagen. Direkt zum besten Angebot. Nur auf PAPRICAR.',
    images: ['/preview.jpg']
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PAPRICAR'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  },
  icons: {
    apple: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${inter.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PAPRICAR" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="pt-16">
        <Navbar />
        {children}
      </body>
    </html>
  )
} 