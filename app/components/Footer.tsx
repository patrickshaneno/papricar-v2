import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Rechtliche Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/agb" className="hover:text-white transition-colors">
                  AGB
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-white transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="hover:text-white transition-colors">
                  Impressum
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <h3 className="text-white font-semibold mb-4">Unternehmen</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ueber-uns" className="hover:text-white transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/karriere" className="hover:text-white transition-colors">
                  Karriere
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2">
              <li>
                <a href="tel:+4930123456789" className="hover:text-white transition-colors">
                  +49 (0) 30 123456789
                </a>
              </li>
              <li>
                <a href="mailto:info@papricar.de" className="hover:text-white transition-colors">
                  info@papricar.de
                </a>
              </li>
              <li>
                <span>
                  PAPRICAR UG (haftungsbeschränkt)<br />
                  Musterstraße 123<br />
                  10115 Berlin
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>
            © {new Date().getFullYear()} PAPRICAR. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
} 