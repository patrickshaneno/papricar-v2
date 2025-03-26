import { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import HowItWorks from '@/components/home/HowItWorks'
import Testimonials from '@/components/home/Testimonials'
import CTA from '@/components/home/CTA'

export const metadata: Metadata = {
  title: 'PAPRICAR - Ihre Plattform für den Fahrzeughandel',
  description: 'PAPRICAR ist die innovative Plattform, die Händler und Käufer im Automobilhandel zusammenbringt. Entdecken Sie neue Möglichkeiten für Ihren Fahrzeughandel.',
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </main>
  )
} 