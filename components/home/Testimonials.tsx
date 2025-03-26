'use client'

import Container from '@/components/ui/Container'

const testimonials = [
  {
    body: 'PAPRICAR hat unseren Fahrzeugverkauf revolutioniert. Die Plattform ist einfach zu bedienen und die Resonanz ist hervorragend.',
    author: {
      name: 'Michael Schmidt',
      handle: 'Auto Schmidt GmbH',
      role: 'Geschäftsführer',
    },
  },
  {
    body: 'Die direkte Kommunikation mit den Interessenten und die professionelle Präsentation unserer Fahrzeuge haben zu deutlich mehr Verkäufen geführt.',
    author: {
      name: 'Sarah Weber',
      handle: 'Weber Automobile',
      role: 'Verkaufsleiterin',
    },
  },
  {
    body: 'Endlich eine moderne Plattform, die versteht was Händler brauchen. Die Statistiken und Analysen helfen uns, unsere Angebote zu optimieren.',
    author: {
      name: 'Thomas Müller',
      handle: 'Autohaus Müller',
      role: 'Inhaber',
    },
  },
]

export default function Testimonials() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Das sagen unsere Kunden
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Erfahren Sie, wie PAPRICAR Händlern hilft, ihre Fahrzeuge erfolgreicher zu vermarkten.
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author.handle} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                <figure className="card">
                  <blockquote className="text-gray-900">
                    <p className="text-lg leading-relaxed">{`"${testimonial.body}"`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div className="flex flex-col">
                      <div className="font-semibold text-gray-900 text-lg">{testimonial.author.name}</div>
                      <div className="text-gray-600">{`${testimonial.author.role}, ${testimonial.author.handle}`}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
} 