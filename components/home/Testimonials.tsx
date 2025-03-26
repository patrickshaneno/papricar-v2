'use client'

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
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Das sagen unsere Kunden
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Erfahren Sie, wie PAPRICAR Händlern hilft, ihre Fahrzeuge erfolgreicher zu vermarkten.
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author.handle} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                  <blockquote className="text-gray-900">
                    <p>{`"${testimonial.body}"`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                      <div className="text-gray-600">{`${testimonial.author.role}, ${testimonial.author.handle}`}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 