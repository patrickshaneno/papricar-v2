import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Willkommen bei Next.js 14</h1>
        <p className="text-xl">
          Dies ist eine moderne Next.js-Anwendung mit TypeScript und Tailwind CSS.
        </p>
      </div>
    </main>
  )
} 