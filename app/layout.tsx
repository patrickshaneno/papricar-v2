import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PAPRICAR - Ihre Plattform für professionelle Fahrzeugvermittlung',
  description: 'PAPRICAR – Der Marktplatz für Neuwagen & geprüfte Gebrauchte mit voller Transparenz & direkter Händleranfrage.',
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
    <html lang="de">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PAPRICAR" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
} 